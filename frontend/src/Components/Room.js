import React from "react"
import "../SidebarChat.css"
import { Avatar } from '@material-ui/core'

const Room = (props) => {

   return (
         <div className='sidebarChat_info'>
            <h2 id={props.room.id} value={props.room.name}>{props.room.name}</h2>
         </div>
   )
}

export default Room; 