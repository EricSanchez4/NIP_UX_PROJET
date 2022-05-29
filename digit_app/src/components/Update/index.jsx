import React, { useState } from 'react';
import { get_user, update_user } from '../../api/session.js';

const Update = ({setRoute}) => {
  const [IdInputValue, setIdInputValue] = useState("");
  const [firstnameInputValue, setFirstnameInputValue] = useState("");
  const [lastnameInputValue, setLastnameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  
  const getUser = async (id) => {
    const response = await get_user(id);
    switch (response.status) {
      case 200:
        const data = response.data[0];
        setFirstnameInputValue(data.firstname);
        setLastnameInputValue(data.lastname);
        setEmailInputValue(data.email);
        setPasswordInputValue(data.user_password);
        setIsEnabled(true);
        break;
    
        case 404:
        setMessage("L'user n'est pas inscrit en BDD. Le serveur Express shutdown. (a corriger)");
        break;

      default:
        console.error(response.status);
        break;
    }
  };
  const UpdateUser = async (id) => {
    const myjson = { firstname: firstnameInputValue, lastname: lastnameInputValue, email: emailInputValue, user_password: passwordInputValue }
    const status = await update_user(id, myjson);
    switch (status) {
      case 204:
        setMessage("Update OK !");
        break;
    
        case 404:
        setMessage("Update fail !");
        break;

      default:
        console.error(status);
        break;
    }
  }
 

  return <section>
    <h1>Update User By ID</h1>
    <form action="" onSubmit={async (event) => {
      event.preventDefault();
      getUser(IdInputValue);
      
    }}>
      <input 
        type="text"
        name="id"
        id="id"
        placeholder="ID of the user to modify"
        value={IdInputValue}
        onChange={(event) => setIdInputValue(event.target.value)}
      />
      <button type="submit">Get User</button>
    </form>

     {isEnabled && <form action="" onSubmit={async (event) => {
      event.preventDefault();
      const status = await UpdateUser(IdInputValue);
      switch (status) {
        case 204:
          setMessage("success");
          break;
      
        default:
          setMessage("Error");
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
      <button type="submit">Update User</button>
    </form>}
    <p onClick={() => setRoute("home")}>Home</p>
    <p>{message}</p>
  </section>
};

export default Update;