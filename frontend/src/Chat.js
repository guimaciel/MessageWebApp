import { Avatar } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import "./Chat.css";
import ChatList from './Components/ChatList';

//integrar com o database
function Chat(props) {

  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("props.room.id");
  const [disableChat, setDisableChat] = useState( (props.room.id === null ? "disabled" : "") );

  useEffect(() => {
    setRoomId(props.room.id);
    if (props.room.id) {
      setDisableChat("");
    } else {
      setDisableChat("disabled");
    }
  }, [props.room.id])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    props.setMessage(message);
  }
  
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_headerInfo'>
                <h3>{props.room.name}</h3>

            </div>
            
        </div>
        
        <div className='chat_body'>
          
         
            {/* <span className='chat_name'>dddd</span>
            <span className='chat_timestamp'>13:30</span> */}

            <ChatList chatList={props.messages} />


        
          

        </div>
        <div className='chat_footer'>
          <form onSubmit={sendMessage}>
            <input name="message" placeholder="Type a message" type="text" disabled={ disableChat } onChange={ (event) => setMessage(event.target.value) }/>
            <button disabled={ disableChat }>Send</button> 
          </form>

        </div>
    </div>
  )
}

export default Chat;