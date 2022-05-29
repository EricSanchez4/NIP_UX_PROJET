import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import AllUsers from './components/AllUsers';
import Register from './components/Register';
import Update from './components/Update';
import Delete from './components/Delete';

const App = () => {
  const [route, setRoute] = useState("home");

  return (
    <main className="App">
      {route === "home" && <Home setRoute={setRoute} />}
      {route === "allusers" && <AllUsers setRoute={setRoute} />}
      {route === "register" && <Register setRoute={setRoute} />}
      {route === "update" && <Update setRoute={setRoute} />}
      {route === "delete" && <Delete setRoute={setRoute} />}
    </main>
  );
}

export default App;
