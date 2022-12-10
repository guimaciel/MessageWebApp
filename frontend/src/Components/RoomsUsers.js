import React from "react";

import "../Chat.css";
import Room from "./Room";

export default function RoomsUsers(props) {

   if (!props.usersRooms) return "";
   const roomsUsers = Object.values(props.usersRooms).map((user) => {
      console.log(user);
      return (
         <h3>{user.name}</h3>
      );
   }); 
   return roomsUsers;
}
