import React from "react";
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import {Avatar, IconButton} from "@material-ui/core";
import { DonutLargeIcon } from "@material-ui/icons/DonutLarge";
import {ChatIcon} from "@material-ui/icons/chat"
import {MoreVertIcon} from "@material-ui/icons/MoreVert"



 

function Sidebar(){
    return(
        <div className="sidebar ">
            <div className="sidebar_header">
                <Avatar/>
                <div className="sidebar_header_right">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>

                <IconButton>
                    <ChatIcon/>
                </IconButton>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>  
                </div>

            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

            </div>
        </div>
    )
}

export default Sidebar;