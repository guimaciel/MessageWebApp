import { Avatar } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import "./Chat.css";
import ChatList from './Components/ChatList';
import RoomsUsers from './Components/RoomsUsers';


//integrar com o database
function Chat(props) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const [roomId, setRoomId] = useState(props.room.id);
  const [disableChat, setDisableChat] = useState( (props.room.id === null ? "disabled" : "") );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

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
    console.log("aaa",messages);
    props.setMessage(message);
    setMessage("");
    scrollToBottom();

  }

  console.log(props.usersRooms);

   
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_headerInfo'>

                <h3>{props.room.name}</h3>

            </div>
            
        </div>

        <div className='chat_container'>
          <div className='rooms_users'>
            <h3>Users</h3>
            <RoomsUsers usersRooms={props.usersRooms} />
            
          </div>
        
          <div className='chat_body'  >
            
          
              {/* <span className='chat_name'>dddd</span>
              <span className='chat_timestamp'>13:30</span> */}

              <ChatList chatList={props.messages} 
                        userId={props.userId}/>
              <div ref={messagesEndRef} />

          </div>
        </div>
        
        <div className='chat_footer'>
          <form onSubmit={sendMessage}>
            <input name="message" placeholder="Type a message" type="text" disabled={ disableChat } onChange={ (event) => setMessage(event.target.value) } value={message}/>
            <button disabled={ disableChat }>Send</button> 
          </form>

        </div>
    </div>
  )
}

export default Chat;