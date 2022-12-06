import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import io from 'socket.io-client'
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from "./Login";
import { useCookies } from 'react-cookie';

const urlServer = "http://localhost:8000/";

const socket = io.connect("http://localhost:8000");

function App() {

  // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [createRoom, setCreateRoom] = useState('');
  const [joinRoom, setJoinRoom] = useState('');
  


  // Socket ----->
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setDays(data.days);
      // setAppointmentsRec(data.appointments);

      getCookie();
      // setRoomId(getCookieRoom());

      try {
        axios.get('http://localhost:8000/sessionRoom', {withCredentials: true}).then((res) => {
          if (res.data.room) {
            console.log(res.data.room);
            if (data.msg.room.id === res.data.room) {
              console.log("CARREGA");
              loadMessages(res.data.room);
            } else {
              console.log("NAO CARREGA");
            }
          }
        });
      } catch(error) {
        console.log(error);
      }

      console.log("aaaaaaaaa");
      loadRooms();
      // loadMessages();
      console.log("USER", userId);
      console.log(data);
      console.log("Socket Rooms",rooms);
      console.log("Socket Messages", messages);
      console.log("Room ID", roomId);
      // console.log(JSON.stringify(cookies["room"]));
      // teste(data.msg);
      // console.log("Room:",room);
      // console.log(data.msg.room);
      // setRoom(data.msg.room);
      
    })
  }, [socket]);

  // useEffect(() => {
  //   // socket.emit("send_message",{day,days,appointments});
  //   socket.emit("send_message",{message});
  // }, [message]);
  // <---- Socket

  const getCookieRoom = async () => {
    try {
      axios.get('http://localhost:8000/sessionRoom', {withCredentials: true}).then((res) => {
        if (res.data.room) {
          // setRoomId(res.data.room);
          return res.data.room;
        }
      });
    } catch(error) {
      console.log(error);
    }
 }

  const getCookie = async () => {
    try {
      const {data} = await axios.get('http://localhost:8000/session', {withCredentials: true});
      if (data.id) {
        setUserId(data.id);
        setUserName(data.name);
        setRoomId(data.room);
      }
    } catch(error) {
      console.log(error);
    }
 }
 getCookie();

 // Load Rooms
 useEffect(()=>{
    // if (room !== '') {
    //   try {
    //       axios.get('http://localhost:8000/rooms').then((res) => {
    //           setRooms(res.data);
    //       })
    //   } catch (error) {
    //       console.log(error);
    //   }
    // }
    loadRooms();
  },[]);

  const loadRooms = () => {
    if (room !== '') {
      try {
          axios.get('http://localhost:8000/rooms', {withCredentials: true}).then((res) => {
              setRooms(res.data);
          })
      } catch (error) {
          console.log(error);
      }
    }
  }

  // Load Room Messages
  useEffect(()=>{
    // if (room.id) {
    //   console.log(room, typeof(room));
    //   // setCookie('room',room, { path: '/'});
    //   try {
    //     axios.get('http://localhost:8000/messages/' + room.id).then((res) => {
    //       const msg = res.data.map((item) => {
    //         return {
    //           id: item.idmessage,
    //           message: item.message,
    //           dtMessage: item.dtmessage,
    //           room: {
    //             id: item.roomid,
    //             name: item.roomname,
    //             numMessages: 0,
    //           },
    //           user: {
    //             id: item.userid,
    //             name: item.username,
    //           }
    //         }
    //       })
    //       setMessages(msg);
    //     })
    //   } catch (error) {
    //       console.log(error);
    //   }
    
    // }
    if (room.id) {
      loadMessages(room.id);
    }

  },[room]);

  const loadMessages = (idRoom) => {
    
      console.log("LOAD MSG",idRoom);
      // setCookie('room',room, { path: '/'});
      let lastIdMsg = 0;
      try {
        axios.get('http://localhost:8000/messages/' + idRoom, {withCredentials: true})
        .then((res) => {
          console.log("MSGS LOADED",res.data);
          const msg = res.data.map((item) => {
            return {
              id: item.idmessage,
              message: item.message,
              dtMessage: item.dtmessage,
              room: {
                id: item.roomid,
                name: item.roomname,
                numMessages: 0,
              },
              user: {
                id: item.userid,
                name: item.username,
              }
            }
          })
          if (msg.length > 0) {
            lastIdMsg = msg[msg.length-1].id;
          }
          console.log(lastIdMsg);
          setMessages(msg);
          updateLastViewed(idRoom, lastIdMsg);
        }).then((msg) => {
          console.log(message);
        })
          
      } catch (error) {
          console.log(error);
      }
  }

  const updateLastViewed = (idRoom, lastIdMsg) => {
    const params = {
      room: idRoom,
      idLastMessage: lastIdMsg,
      teste: 1,
    }
    console.log("Params", rooms);
    
    try {
      axios.post("http://localhost:8000/updateLastViewed", params, {withCredentials: true}).then((res) => {
            console.log("Update", res.data);
        });
    } catch (error) {
      console.log(error);
    }

    for ( let i = 0 ; i < rooms.length ; i++ ) {
      console.log("Room", rooms[i]);
      if ( rooms[i].id == idRoom) {
        rooms[i].nummessages = 0;
        console.log("Room Zerar", rooms[i]);
      }
    }

  }

  useEffect(() => {
    if (message) {
      const msg = {
        id: null,
        message: message,
        dtMessage: null,
        room: {
          id: room.id,
          name: room.name,
          numMessages: 0,
        },
        user: {
          id: userId,
          name: userName,
        }
      }

      
      try {
        axios.post("http://localhost:8000/messages", msg, {withCredentials: true}).then((res) => {
          // console.log("Data Insert", res.data);
          const msgArr = [...messages];
          console.log(res.data[0]);
          msg.id = res.data[0].id;
          msg.dtMessage = res.data[0].dt_message;

          msgArr.push(msg);

          setMessages(msgArr);
          updateLastViewed(msg.room.id, msg.id);
          console.log("nnnn",messages);
          socket.emit("send_message",{msg,messages});
          // console.log("MESSAGES",messages);
          // setRoom(null);
          // setRoom(room);
        })
      } catch (error) {
        console.log(error);
      }
    }

  },[message])

  // useEffect(() => {
  //   console.log("aaaa",messages);
  // }, [messages])

  useEffect(() => {
    console.log("CREATE ROOM", createRoom);
    if (createRoom) {
      try {
        axios.post("http://localhost:8000/checkRoomExists", {name: createRoom}).then((res) => {
          if (res.data.length > 0) {
            alert("Room already exists!");
          } else {
            axios.post("http://localhost:8000/createRoom", {name: createRoom}).then((res) => {
              console.log("INSERIU",res.data[0].id);
              joinR(res.data[0].id);
            })

          }
        })
      } catch(err) {
        console.log("err",err);
      };
      //   axios.post("http://localhost:8000/createRoom", {name: createRoom}).then((res) => {
      //     console.log("INSERIU",res);
      //     // loadRooms();
      //   })
      // } catch(err) {
      //   console.log("err", err);
      // }
    }
  },[createRoom]);

  const joinR = (idRoom) => {
    if (idRoom) {
      try {
        axios.post("http://localhost:8000/joinRooms",{idRoom: idRoom},{withCredentials: true} )
            .then((resp) => {
              console.log("Joined",resp.data);
              loadRooms();
            })
      } catch(err) {
        console.log("err",err);
      }
    }

  }

  useEffect(() => {
    console.log("Join Room", joinRoom);
    joinR(joinRoom);
  },[joinRoom])



 if (userId === null) {
  return <Login userId={userId} 
                userName={userName} />
 } else {

    return(
        <div className="App">
            <div className="app_body">
                <Sidebar rooms={rooms}
                      setRoom={setRoom}
                      setCreateRoom={setCreateRoom}
                      setJoinRoom={setJoinRoom}
                 />
                
                <Chat messages={messages} 
                    room={room} 
                    setMessage={setMessage} 
                    userId={userId} />

            </div>

        </div>
    );
 }

}

export default App;
