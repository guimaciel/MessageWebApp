import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import io from 'socket.io-client'
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from "./Login";

const socket = io.connect("http://localhost:8000");

function App() {

  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Socket ----->
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setDays(data.days);
      // setAppointmentsRec(data.appointments);
      console.log("Socket",data);
    })
  }, [socket]);

  useEffect(() => {
    // socket.emit("send_message",{day,days,appointments});
    socket.emit("send_message",{message});
  }, [message]);
  // <---- Socket

  const getCookie = async () => {
    try {
      const {data} = await axios.get('http://localhost:8000/name', {withCredentials: true});
      // setUserId(data.message.userId);
      // console.log(data.message);
      if (data.id) {
        setUserId(data.id);
        console.log(data);
      }
    } catch(error) {
      console.log("ERROU FEIO ERROU RUDE");
    }
 }
 getCookie();

 // Load Rooms
 useEffect(()=>{
    if (room !== '') {
      try {
          axios.get('http://localhost:8000/rooms').then((res) => {
              setRooms(res.data);
          })
      } catch (error) {
          console.log(error);
      }
    }
  },[]);

  // Load Room Messages
  useEffect(()=>{
    if (room) {
      try {
        axios.get('http://localhost:8000/messages/' + room.id).then((res) => {
          const msg = res.data.map((item) => {
            return {
              id: item.idmessage,
              message: item.message,
              dtMessage: item.dtmessage,
              room: {
                id: item.roomid,
                name: item.roomname,
              },
              user: {
                id: item.userid,
                name: item.username,
              }
            }
          })
          setMessages(msg);
        })
      } catch (error) {
          console.log(error);
      }
    }

  },[room]);

  useEffect(() => {
    const msg = {
      id: null,
      message: message,
      dtMessage: null,
      room: {
        id: room.id,
        name: room.name,
      },
      user: {
        id: userId,
        name: null,
      }
    }
    console.log("teste",msg);

  },[message])

 if (userId === null) {
  return <Login userId={userId} />
 } else {

    return(
        <div className="App">
            <div className="app_body">
                <Sidebar rooms={rooms}
                      setRoom={setRoom}
                 />
                
                <Chat messages={messages} 
                    room={room} 
                    setMessage={setMessage} />

            </div>

        </div>
    );
 }

}

export default App;
