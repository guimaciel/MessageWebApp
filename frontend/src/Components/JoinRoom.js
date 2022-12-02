import React, {useState} from "react";


export default function JoinRoom(props) {

   const [roomId, setRoomId] = useState('');

   const createRoom = (e) => {
      e.preventDefault();
      if (roomId === '') {
         alert("Select a room to join!");
      } else {
         console.log(roomId);
      }
  }
   
   return (
      <div>
         <form onSubmit={createRoom}>
                <select name="room" onChange={(e)=>{setRoomId(e.target.value)}}>
                  <option value="">Choose Room</option>
                  <option value="1">Room 1</option>
               </select>
                <button>Create</button>
            </form>
      </div>
   )
}
