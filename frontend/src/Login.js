import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
   const [usernameReg, setUsernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");
   const [nameReg, setNameReg] = useState("");
 
   const [userId, setUserId] = useState(props.userId);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
 
   const inputC = useRef();

   // Referëncia uso de cookie session - Apagar no final ------->
   const storeCookie = async()=>{
      try{
      const {data} = await axios.post('http://localhost:8000/new', {
         userId: inputC.current.value,
      }, {withCredentials: true});
      } catch(error) {
      console.log(error);
      }
   };

   const getCookie = async () => {
      try {
      const {data} = await axios.get('http://localhost:8000/name', {withCredentials: true});
      setUserId(data.message.userId);
      console.log(data.message);
      } catch(error) {
      console.log(error);
      }
   }
   // <------- Referëncia uso de cookie session - Apagar no final 

   const register = () => {
      axios
        .post("http://localhost:8000/register", {
          email: usernameReg,
          password: passwordReg,
          name: nameReg,
        })
        .then((response) => {
          console.log(response);
        });
    };
  
    const login = () => {
      axios
        .post("http://localhost:8000/login", {
          email: username,
          password: password,
        }, {withCredentials: true})
        .then((response) => {
          console.log("fsdfsdafs",response);
          window.location.reload(false);
        });
    };

    return (
      <div className="App">
        <div className="registration">
          <h1>Registration</h1>
          <label></label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setNameReg(e.target.value);
            }}
          />
          <label></label>
          <input
            type="text"
            placeholder="e-mail"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label></label>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <button onClick={register}>Register</button>
        </div>
        <div className="login">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}> Login </button>
        </div>
        <div className="session">
          <h1>Session</h1>
          <input ref={inputC} />
          <button onClick={storeCookie}> Store Cookie </button>
          <button onClick={getCookie}> Retrieve Cookie </button>
        </div>
      </div>
    );

}

export default Login;