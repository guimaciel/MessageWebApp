import React, {useRef} from "react"
import "../Chat.css";
import { Avatar } from '@material-ui/core'

export default function ChatItem (props) {

   const classChatItem = props.chatItem.user.id === props.userId ? "chatItemUser" : "chatItem";
   const scollToRef = useRef();


   function formatDate(dt) {
      const dat = new Date(dt);
      return dat.toLocaleString();
   }

   return (
         <div className={classChatItem}>
            <div className="messageHeader">
               <span className='chat_name'>{props.chatItem.user.name}</span>
               <span className='chat_timestamp'>{ formatDate(props.chatItem.dtMessage)}</span>
            </div>
            <span className='chat_message'>{props.chatItem.message}</span>
         </div>
   )
} 