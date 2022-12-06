import React from "react";
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import {Avatar, IconButton} from "@material-ui/core";

function Sidebar(props){

    return(
        <div className="sidebar ">
            <div className="sidebar_header">
                <Avatar/>
                <div className="sidebar_header_right">
                <IconButton>
                    
                </IconButton>

                <IconButton>
                    
                </IconButton>

                <IconButton>
                    
                </IconButton>  
                </div>

            </div>
            <div className="sidebar_chat">
                <SidebarChat rooms={props.rooms}
                            setRoom={props.setRoom}
                            setCreateRoom={props.setCreateRoom}
                            setJoinRoom={props.setJoinRoom}
                /> 
            </div>
        </div>
    )
}

export default Sidebar;