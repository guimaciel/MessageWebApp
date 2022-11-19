import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import Login from "./Login";

function App() {
  // const [usernameReg, setUsernameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");
  // const [nameReg, setNameReg] = useState("");

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  // const inputC = useRef();
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
      console.log("ERRO");
    }
 }

 getCookie();

 
 
  console.log("TESTE", userId);
  if (userId === null) {
    return <Login userId={userId} />
  }

  // const register = () => {
  //   axios
  //     .post("http://localhost:8000/register", {
  //       email: usernameReg,
  //       password: passwordReg,
  //       name: nameReg,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  // const login = () => {
  //   axios
  //     .post("http://localhost:8000/login", {
  //       email: username,
  //       password: password,
  //       name: name,
  //     }, {withCredentials: true})
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  // return (
  //   <div className="App">
  //     <div className="registration">
  //       <h1>Registration</h1>
  //       <label>Username</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setNameReg(e.target.value);
  //         }}
  //       />
  //       <label>Username</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setUsernameReg(e.target.value);
  //         }}
  //       />
  //       <label>Password</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setPasswordReg(e.target.value);
  //         }}
  //       />
  //       <button onClick={register}>Register</button>
  //     </div>
  //     <div>
  //       <h1>Login</h1>
  //       <input
  //         type="text"
  //         placeholder="Name..."
  //         onChange={(e) => {
  //           setName(e.target.value);
  //         }}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Username..."
  //         onChange={(e) => {
  //           setUsername(e.target.value);
  //         }}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Password..."
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //       />
  //       <button onClick={login}> Login </button>
  //     </div>
  //     <div>
  //       <h1>Session</h1>
  //       <input ref={inputC} />
  //       <button onClick={storeCookie}> Store Cookie </button>
  //       <button onClick={getCookie}> Retrieve Cookie </button>
  //     </div>
  //   </div>
  // );
}

export default App;
