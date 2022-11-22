import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import RoomList from "./Components/RoomList";

function SidebarChat(props) {

    const addNewChat = true;

    const [seed, setSeed] = useState('');
    
    useEffect(()=> {
        setSeed(Math.floor(Math.random() *5000))         

    }, []);

    
    const createChat = () => {
        //melhorar!!
        const roomName = prompt("Insert your chat name");
        if (roomName){
            //integrar com o database

        }
    };

    const changeRoom = (e) => {;
        props.setRoom({id: e.target.id,
                        name: e.target.innerHTML });
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
            <RoomList roomList={props.rooms} />
        </div>
        <div onClick={createChat} className='sidebar_item'>

            <h2>Start new chat</h2>
        </div>
    </div>
  )

}

export default SidebarChat
