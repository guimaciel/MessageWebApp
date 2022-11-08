import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Sidebar.css"

function SidebarChat(addNewChat) {

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


    return !addNewChat ? (
        <div className='sidebarChat'>
            <Avatar src={`http://avatars.dicebar.com/api/human/${seed}.svg`}/>
            <div className='sidebarChat_info'>
                <h2> Room name </h2>
                <p>last message</p>
            </div>
        </div>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
        <h2>Start new chat</h2>
    </div>
  )

}

export default SidebarChat
