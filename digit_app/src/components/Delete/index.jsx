import React, { useState } from 'react';
import { get_user, delete_user } from '../../api/session.js';

const Delete = ({setRoute}) => {
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

  const DeleteUser = async (id) => {
    const response = await delete_user(id);
    switch (response.status) {
      case 204:
        setMessage("User Deleted");
        break;
    
        case 404:
        setMessage("L'user n'est pas inscrit en BDD. Le serveur Express shutdown. (a corriger)");
        break;

      default:
        console.error(response.status);
        break;
    }
  };

   

  return <section>
    <h1>Delete User By ID</h1>
    <form action="" onSubmit={async (event) => {
      event.preventDefault();
      getUser(IdInputValue);
      
    }}>
      <input 
        type="text"
        name="id"
        id="id"
        placeholder="ID of the user to delete."
        value={IdInputValue}
        onChange={(event) => setIdInputValue(event.target.value)}
      />
      <button type="submit">Get User</button>
    </form>

     
    {isEnabled && 
    <form action="" onSubmit={async (event) => {
      event.preventDefault();
      DeleteUser(IdInputValue);
      
    }}>
      <p>{"Firstname: "} {firstnameInputValue}</p>
      <p>{"Lastname: "} {lastnameInputValue}</p>
      <p>{"Email: "} {emailInputValue}</p>
      <p>{"Password: "} {passwordInputValue}</p>
      <button type="submit">⚠️Delete this user⚠️</button>
    </form>}

    <p onClick={() => setRoute("home")}>Home</p>
    <p>{message}</p>
  </section>
};

export default Delete;