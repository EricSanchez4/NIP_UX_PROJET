import React, { useState } from 'react';
import { sign_up } from "../../api/session.js";

const Register = ({setRoute}) => {
  const [firstnameInputValue, setFirstnameInputValue] = useState("");
  const [lastnameInputValue, setLastnameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  return <section>
    <h1>Create New User</h1>
    <form action="" onSubmit={async (event) => {
      event.preventDefault();
      const status = await sign_up(firstnameInputValue, lastnameInputValue, emailInputValue, passwordInputValue);
      switch (status) {
        case 201:
          setRoute("home");
          break;
      
        default:
          break;
      }
    }}>
      <input 
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Firstname"
        value={firstnameInputValue}
        onChange={(event) => setFirstnameInputValue(event.target.value)}
      />
      <input 
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Lastname"
        value={lastnameInputValue}
        onChange={(event) => setLastnameInputValue(event.target.value)}
      />
      <input 
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={emailInputValue}
        onChange={(event) => setEmailInputValue(event.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={passwordInputValue}
        onChange={(event) => setPasswordInputValue(event.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    <p onClick={() => setRoute("home")}>Home</p>
  </section>
};

export default Register;