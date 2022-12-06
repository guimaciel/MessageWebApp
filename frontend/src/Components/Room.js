import React from "react"
import "../SidebarChat.css"
import { Avatar } from '@material-ui/core'

const Room = (props) => {

   const numMsg = () => {
      if (props.room.nummessages > 0) {
         return "(" + props.room.nummessages + ")";
      }
      return "";
   }

   console.log([props.room]);
   return (
         <div className='sidebarChat_info'>
            <h2 id={props.room.id} value={props.room.name}>{props.room.name}</h2>
            <h4>{numMsg()}</h4>

         </div>
   )
}

export default Room; 