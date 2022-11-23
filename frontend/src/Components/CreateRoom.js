import React, {useState} from "react";


export default function ChatRoom(props) {

   const [newRoomName, setNewRoomName] = useState('');

   const createRoom = (e) => {
      e.preventDefault();
      console.log(newRoomName);
  }
  
   return (
      <div>
         <form onSubmit={createRoom}>
                <label>Room name:</label>
                <input type="text" placeholder='Room Name' onChange={ (e) => {setNewRoomName(e.target.value)}} />
                <button>Create</button>
            </form>
      </div>
   )
}
