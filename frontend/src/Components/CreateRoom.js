import React, {useState} from "react";


export default function ChatRoom(props) {

   const [newRoomName, setNewRoomName] = useState('');

   const createRoom = (e) => {
      e.preventDefault();
      console.log(newRoomName);
      props.setCreateRoom(newRoomName);
  }
   
   return (
      <div className="sidebarChat_info_form">
         <form onSubmit={createRoom}>
                <label>Room name:</label>
                <input type="text" className="formSideBar" placeholder='Room Name' onChange={ (e) => {setNewRoomName(e.target.value)}} />
                <button className="formSideBarBtn">Create</button>
            </form>
      </div>
   )
}
