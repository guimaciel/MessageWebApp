import React from "react";

import "../SidebarChat.css"
import Room from "./Room";

export default function RoomList(props) {

  
   const roomList = Object.values(props.roomList).map((room) => {
      return (
         <Room room={room} key={room.id}/>
      );
   }); 
   return roomList;
}
