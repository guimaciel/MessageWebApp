import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Chat.css";

function Chat() {
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_headerInfo'>
                <h3>Room name</h3>

            </div>
            
        </div>
        //integrar com o database
        <div className='chat_body'>
          
         
            <span className='chat_name'></span>
            <span className='chat_timestamp'></span>
        
          

        </div>
        <div className='chat_footer'>

        </div>
    </div>
  )
}

export default Chat;