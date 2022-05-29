import React, { useState } from 'react';
import { sign_in } from "../../api/session.js";

const LogIn = ({setRoute}) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [message, setMessage] = useState("");

  return <section>
    <h1>Log In</h1>
    <form action="" onSubmit={async (event) => {
      event.preventDefault();
      const status = await sign_in(emailInputValue, passwordInputValue);
      switch (status) {
        case 202:
          setMessage("Connection avec succès");
          setRoute("home");
          break;

        case 404:
          setMessage("Le mail n'est pas encore enregistré");
          break;

        case 406:
          setMessage("Mauvais mot de passe");
          break;
        
        default:
          setMessage("Erreur");
          break;
      };
    }}>
      <input 
        type="email"
        name="email"
        id="email"
        value={emailInputValue}
        onChange={(event) => setEmailInputValue(event.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={passwordInputValue}
        onChange={(event) => setPasswordInputValue(event.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
    <p onClick={() => setRoute("register")}>Register</p>
    <p>{message}</p>
  </section>
};

export default LogIn;