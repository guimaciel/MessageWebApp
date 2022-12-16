import React, {useState, useEffect} from "react";
import axios from "axios";
import JoinRoomSelect from "./JoinRoomSelect";

export default function JoinRoom(props) {

   const [roomId, setRoomId] = useState('');
   const [rooms, setRooms] = useState({});

   useEffect(() => {
      try {
         axios.get(`${process.env.REACT_APP_URL_SERVER}/listRoomsNotInto`, {withCredentials: true})
            .then((res) => {
               console.log("Rooms", res.data);
               setRooms(res.data);
            })
      } catch(err) {
         console.log("err", err);
      }
   },[]);

   const joinRoom = (e) => {
      e.preventDefault();
      if (roomId === '') {
         alert("Select a room to join!");
      } else {
         console.log(roomId);
         props.setJoinRoom(roomId);
      }
  }
   
   return (
      <div className="sidebarChat_info_form">
         <form onSubmit={joinRoom}>
                <select name="room" className="formSideBar" onChange={(e)=>{setRoomId(e.target.value)}}>
                  <option value="">Choose Room</option>
                  <JoinRoomSelect rooms={rooms} />
               </select>
                <button className="formSideBarBtn">Join</button>
            </form>
      </div>
   )
}
