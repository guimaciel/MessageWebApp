import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import io from 'socket.io-client'
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from "./Login";
import { useCookies } from 'react-cookie';
import { useScrollTrigger } from "@material-ui/core";


const socket = io.connect(process.env.REACT_APP_URL_SERVER);

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
  const [usersRooms, setUsersRooms] = useState({});
  const [logout, setLogout] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoineRoom] = useState(false);
  


  // Socket ----->
  useEffect(() => {
    socket.on("receive_message", (data) => {
      
      loadRooms();

      
      // try {
      //   axios.get(`${process.env.REACT_APP_URL_SERVER}/sessionRoom`, {withCredentials: true}).then((res) => {
      //     if (res.data.room) {
      //       console.log(res.data.room);
      //       if (data.msg.room.id === res.data.room) {
      //         console.log("CARREGA");
      //         loadMessages(res.data.room);
      //       } else {
      //         console.log("NAO CARREGA");
      //       }
      //     }
      //   });
      // } catch(error) {
      //   console.log(error);
      // }
      // console.log("aaaaaaaaa");
      // loadRooms();
      // console.log("USER", userId);
      // console.log(data);
      // console.log("Socket Rooms",rooms);
      // console.log("Socket Messages", messages);
      // console.log("Room ID", roomId);

      
    })
  }, [socket]);

  // useEffect(() => {
  //   // socket.emit("send_message",{day,days,appointments});
  //   socket.emit("send_message",{message});
  // }, [message]);
  // <---- Socket

//   const getCookieRoom = async () => {
//     try {
//       axios.get(`${process.env.REACT_APP_URL_SERVER}/sessionRoom`, {withCredentials: true}).then((res) => {
//         if (res.data.room) {
//           // setRoomId(res.data.room);
//           return res.data.room;
//         }
//       });
//     } catch(error) {
//       console.log(error);
//     }
//  }

  const getCookie = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_URL_SERVER}/session`, {withCredentials: true});
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

 useEffect(() => {
  const fndRoom = rooms.find(({id}) => id == room.id);
  if (fndRoom && fndRoom.nummessages > 0) {
    loadMessages(fndRoom.id);
  }
 },[rooms])

 useEffect(() => {
  getCookie();
 })

 // Load Rooms
 useEffect(()=>{
    loadRooms();
  },[]);

  const loadRooms = () => {
    if (room !== '') {
      try {
          axios.get(`${process.env.REACT_APP_URL_SERVER}/rooms`, {withCredentials: true}).then((res) => {
              setRooms(res.data);
          })
      } catch (error) {
          console.log(error);
      }
    }
  }

  // Load Room Messages
  useEffect(()=>{

    if (room.id) {
      loadMessages(room.id);
    }

  },[room]);

  const loadMessages = (idRoom) => {
    
      // setCookie('room',room, { path: '/'});
      let lastIdMsg = 0;
      // try {
        axios.get(`${process.env.REACT_APP_URL_SERVER}/messages/` + idRoom, {withCredentials: true})
        .then((res) => {
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
          setMessages(msg);
          updateLastViewed(idRoom, lastIdMsg);
        }).then((msg) => {
          loadUsersRooms(idRoom);
        })
          
      // } catch (error) {
      //     console.log("error", error);
      // }
  }

  const loadUsersRooms = (idRoom) => {
    try {
      axios.get(`${process.env.REACT_APP_URL_SERVER}/roomUsers/` + idRoom).then((res) => {
        setUsersRooms(res.data);
      })
    } catch (error) {
      console.log("Error",error);
      setUsersRooms({});
    }
  }

  const updateLastViewed = (idRoom, lastIdMsg) => {
    const params = {
      room: idRoom,
      idLastMessage: lastIdMsg,
      teste: 1,
    }
    
    try {
      axios.post(`${process.env.REACT_APP_URL_SERVER}/updateLastViewed`, params, {withCredentials: true}).then((res) => {
        });
    } catch (error) {
      console.log(error);
    }

    for ( let i = 0 ; i < rooms.length ; i++ ) {
      if ( rooms[i].id == idRoom) {
        rooms[i].nummessages = 0;
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

      // console.log("Message To Server", msg);
      console.log("Server",process.env.REACT_APP_URL_SERVER);
      try {
        axios.post(`${process.env.REACT_APP_URL_SERVER}/messages`, msg, {withCredentials: true}).then((res) => {
          const msgArr = [...messages];
          console.log("Msg inserida", res);
          msg.id = res.data[0].id;
          msg.dtMessage = res.data[0].dt_message;

          msgArr.push(msg);

          setMessages(msgArr);
          updateLastViewed(msg.room.id, msg.id);
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
    if (createRoom) {
      try {
        axios.post(`${process.env.REACT_APP_URL_SERVER}/checkRoomExists`, {name: createRoom}).then((res) => {
          if (res.data.length > 0) {
            alert("Room already exists!");
          } else {
            axios.post(`${process.env.REACT_APP_URL_SERVER}/createRoom`, {name: createRoom}).then((res) => {
              joinR(res.data[0].id);
            })

          }
        })
      } catch(err) {
        console.log("err",err);
      };
      setShowCreateRoom(false);
    }
  },[createRoom]);

  const joinR = (idRoom) => {
    if (idRoom) {
      try {
        axios.post(`${process.env.REACT_APP_URL_SERVER}/joinRooms`,{idRoom: idRoom},{withCredentials: true} )
            .then((resp) => {
              loadRooms();
            })
      } catch(err) {
        console.log("err",err);
      }
    }

  }

  useEffect(() => {
    joinR(joinRoom);
    setShowJoineRoom(false);
  },[joinRoom])

  useEffect(() => {
    if (logout) {
      axios.get(`${process.env.REACT_APP_URL_SERVER}/logout`, {withCredentials: true}).then((res) => {
        window.location.reload(false);
      });
    }
  },[logout])



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
                      setLogout={setLogout}
                      setShowCreateRoom={setShowCreateRoom}
                      setShowJoineRoom={setShowJoineRoom}
                      showCreateRoom={showCreateRoom}
                      showJoinRoom={showJoinRoom}
                 />
                
                <Chat messages={messages} 
                    room={room} 
                    setMessage={setMessage} 
                    userId={userId}
                    usersRooms={usersRooms} />

            </div>

        </div>
    );
 }

}

export default App;
