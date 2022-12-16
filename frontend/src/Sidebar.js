import React from "react";
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import {Avatar, IconButton} from "@material-ui/core";

function Sidebar(props){

    const logout = () => {
        props.setLogout(true);
    }

    return(
        <div className="sidebar ">
            <div className="sidebar_header">
                <Avatar/>
                <div className="sidebar_header_right">
                <IconButton>
                    
                </IconButton>

                <IconButton>
                    
                </IconButton>

                <IconButton onClick={logout}>
                    x
                </IconButton>  
                </div>

            </div>
            <div className="sidebar_chat">
                <SidebarChat rooms={props.rooms}
                            setRoom={props.setRoom}
                            setCreateRoom={props.setCreateRoom}
                            setJoinRoom={props.setJoinRoom}
                            setShowCreateRoom={props.setShowCreateRoom}
                            setShowJoineRoom={props.setShowJoineRoom}
                            showCreateRoom={props.showCreateRoom}
                            showJoinRoom={props.showJoinRoom}
                /> 
            </div>
        </div>
    )
}

export default Sidebar;