import React from 'react';
import logo from '../../logo.svg';
import './styles.css';

const Home = ({setRoute}) => {
  return <section>
    <h1>Welcome to my React App</h1>
    <button onClick={() => setRoute("allusers")}>Get All Users</button>
    <button onClick={() => setRoute("register")}>Create New User</button>
    <button onClick={() => setRoute("update")}>Update User</button>
    <button onClick={() => setRoute("delete")}>Delete</button>

  </section>
};

export default Home;