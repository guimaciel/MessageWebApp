import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Chat.css";


//integrar com o database
function Chat() {
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_headerInfo'>
                <h3>Room name</h3>

            </div>
            
        </div>
        
        <div className='chat_body'>
          
         
            <span className='chat_name'></span>
            <span className='chat_timestamp'></span>
        
          

        </div>
        <div className='chat_footer'>
          <form>
            <input placeholder="Type a message" type="text"/>
            <button>Send</button> 
          </form>

        </div>
    </div>
  )
}

export default Chat;