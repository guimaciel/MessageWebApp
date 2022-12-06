import React, {useRef} from "react";

export default function JoinRoomSelectItem (props) {
   return (
      <option value={props.room.id}>{props.room.name}</option>
   )
}