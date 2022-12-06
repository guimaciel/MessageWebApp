import React, {useState, useEffect} from "react";

import "../Chat.css";

import ChatItem from "./ChatItem";

export default function ChatList(props) {

  
   const chatList = Object.values(props.chatList).map((chat) => {
      return (
         <ChatItem chatItem={chat} key={chat.id} userId={props.userId} />
      );
   });

   return chatList;

   // const [chatList, setChatList]  = useState(props.chatList);
   // let chatRet = null;
   // useEffect(() => {
   //    chatRet = Object.values(chatList).map((chat) => {
   //       console.log("qqqqqqqqqqqq");
   //          return (
   //             <ChatItem chatItem={chat} key={chat.id} userId={props.userId} />
   //          );
   //       });
   // },[chatList]);
   // return chatRet;
}
 