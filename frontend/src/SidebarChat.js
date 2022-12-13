import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import RoomList from "./Components/RoomList";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom";

function SidebarChat(props) {

    const addNewChat = true;

    const [seed, setSeed] = useState('');
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [showJoinRoom, setShowJoineRoom] = useState(false);
    
    useEffect(()=> {
        setSeed(Math.floor(Math.random() *5000))         

    }, []);

    
    const createChat = () => {
        setShowCreateRoom(true);
        setShowJoineRoom(false);
        // //melhorar!!
        // const roomName = prompt("Insert your room name");
        // if (roomName){
        //     //integrar com o database

        // }
    };

    const joinChat = () => {
        setShowJoineRoom(true);
        setShowCreateRoom(false);
    }

    const changeRoom = (e) => {
        if (e.target.id) {
            props.setRoom({id: e.target.id,
                            name: e.target.innerHTML });
        }
    }




    return !addNewChat ? (
        
        <div className='sidebarChat'>
            <Avatar src={`http://avatars.dicebar.com/api/human/${seed}.svg`}/>
            <div className='sidebarChat_info'>
                <h2> Room name </h2>
                <p>last message</p>
            </div>
        </div>
  ) : (
    <div>
        <div className='sidebar_item' onClick={changeRoom}>
            <RoomList roomList={props.rooms}  />
        </div>
        <div onClick={createChat} className='sidebarChat_info'>
            <h2>Create room</h2>
        </div>
        { showCreateRoom ? <CreateRoom setCreateRoom={props.setCreateRoom} /> : null }

        <div onClick={joinChat} className='sidebarChat_info'>
            <h2>Join room</h2>
        </div>
        { showJoinRoom ? <JoinRoom setJoinRoom={props.setJoinRoom} /> : null }
    </div>
  )

}

export default SidebarChat
