import React from "react";

import "../Chat.css";

import ChatItem from "./ChatItem";

export default function ChatList(props) {
  
   const chatList = Object.values(props.chatList).map((chat) => {
      return (
         <ChatItem chatItem={chat} key={chat.id}/>
      );
   });
   return chatList;
}
 