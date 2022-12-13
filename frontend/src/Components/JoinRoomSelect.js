import React, {useState, useEffect} from "react";

import JoinRoomSelectItem from "./JoinRoomSelectItem";

export default function JoinRoomSelect(props) {
   const roomsList = Object.values(props.rooms).map((room) => {
      return (
         <JoinRoomSelectItem room={room} key={room.id} />
      );
   });

   return roomsList;

}