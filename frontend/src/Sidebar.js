import React from "react";
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import {Avatar, IconButton} from "@material-ui/core";
 

function Sidebar(){
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