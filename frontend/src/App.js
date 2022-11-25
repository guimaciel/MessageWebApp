import React, { useState, useRef } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from "./Login";
import axios from "axios";

function App() {

  const [userId, setUserId] = useState(null);

  const getCookie = async () => {
    try {
      console.log("fsdfsdafas");
      const {data} = await axios.get('http://localhost:8000/name', {withCredentials: true});
      // setUserId(data.message.userId);
      // console.log(data.message);
      console.log("UserId",data.id);
      if (data.id) {
        setUserId(data.id);
      }
    } catch(error) {
      console.log("ERROU FEIO ERROU RUDE");
    }
 }
 getCookie();

 if (userId === null) {
  return <Login userId={userId} />
 } else {

    return(
        <div className="App">
            <div className="app_body">
                <Sidebar/>
                
                <Chat/>

            </div>

        </div>
    );
 }

}

export default App;
