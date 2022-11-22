import React from "react"
import "../Chat.css";
import { Avatar } from '@material-ui/core'

export default function ChatItem (props) {

   return (
         <div className='chatItem'>
            <span className='chat_name'>{props.chatItem.user.name}</span>
            <span className='chat_timestamp'>{props.chatItem.dtMessage}</span>
            <span className='chat_message'>{props.chatItem.message}</span>
         </div>
   )
}