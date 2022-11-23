import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from "./Login";

function App() {

  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');



  const getCookie = async () => {
    try {
      const {data} = await axios.get('http://localhost:8000/name', {withCredentials: true});
      // setUserId(data.message.userId);
      // console.log(data.message);
      if (data.id) {
        setUserId(data.id);
      }
    } catch(error) {
      console.log("ERRO");
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
      message: message,
      userId: userId,
      roomId: room.id,
    }
    console.log(msg);

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
