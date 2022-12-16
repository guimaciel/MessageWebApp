import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
   const [usernameReg, setUsernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");
   const [nameReg, setNameReg] = useState("");
 
   const [userId, setUserId] = useState(props.userId);
   const [username, setUsername] = useState(props.userName);

   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
 
   const inputC = useRef();

   // Referëncia uso de cookie session - Apagar no final ------->
  //  const storeCookie = async()=>{
  //     try{
  //     const {data} = await axios.post('http://localhost:8000/session', {
  //        userId: inputC.current.value,
  //     }, {withCredentials: true});
  //     } catch(error) {
  //     console.log(error);
  //     }
  //  };

  //  const getCookie = async () => {
  //     try {
  //     const {data} = await axios.get('http://localhost:8000/session', {withCredentials: true});
  //     if(data.message.userId) {
  //       setUserId(data.message.userId);
  //       console.log(data.message);
  //     } else {
  //       console.log("USER",data.message);
  //     }
  //     } catch(error) {
  //     console.log(error);
  //     }
  //  }
   // <------- Referëncia uso de cookie session - Apagar no final 

   const register = () => {
      if (!nameReg) {
        alert("Insert Name to Register User!")
        return;
      }
      if (!usernameReg) {
        alert("Insert Email to Register User!")
        return;
      }
      if (!passwordReg) {
        alert("Insert Password to Register User!")
        return;
      }
      axios
      .post(`${process.env.REACT_APP_URL_SERVER}/checkUserExists`, {
        email: usernameReg,
      }, {withCredentials: true})
      .then((users) => {
        console.log("CHEC K USERS", users.data);
        if (users.data.length > 0) {
          console.log("ERRO");
          alert("This email already exists!");
        } else {
            console.log("INSERIR");
            axios
              .post(`${process.env.REACT_APP_URL_SERVER}/register`, {
                email: usernameReg,
                password: passwordReg,
                name: nameReg,
              });
        }
      }).then(() => {
        alert("User registred successfully!")
        document.getElementById('email').value = usernameReg;
        setUsername(usernameReg);
        document.getElementById('usernameReg').value = "";
        document.getElementById('emailReg').value = "";
        document.getElementById('passwordReg').value = "";
        setNameReg("");
        setPasswordReg("");
        setUsernameReg("");
      });
    };
  
    const login = () => {
      console.log("Login Clicked");
      if (!username) {
        alert("Insert Email to login!")
        return;
      }
      if (!password) {
        alert("Insert Password to login!")
        return;
      }
      axios
        .post(`${process.env.REACT_APP_URL_SERVER}/login`, {
          email: username,
          password: password,
        }, {withCredentials: true})
        .then((response) => {
          console.log("fsdfsdafs",response);
          window.location.reload(false);
        }, (error) => {
          console.log("ERRO LOGIN", error);
          alert("Email or Password is wrong!");
        });
    };

    // const checkUserExists = (email) => {
    //   axios
    //   .post("http://localhost:8000/checkUserExists", {
    //     email: username,
    //   }, {withCredentials: true})
    //   .then((response) => {
    //     return true;
    //   }, (error) => {
    //     return false;
    //   });
    // };
    

    return (
      <div className="App">
        <div className="registration">
          <h1>Registration</h1>
          <label></label>
          <input
            type="text"
            id="usernameReg"
            placeholder="Name"
            onChange={(e) => {
              setNameReg(e.target.value);
            }}
          />
          <label></label>
          <input
            type="text"
            placeholder="Email"
            id="emailReg"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label></label>
          <input
            type="password"
            placeholder="Password"
            id="passwordReg"
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
            placeholder="Email"
            id="email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}> Login </button>
        </div>
      </div>
    );

}

export default Login;