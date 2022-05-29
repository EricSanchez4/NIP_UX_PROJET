import React, { useEffect, useState } from 'react';
import { get_users } from '../../api/session.js';

const AllUsers = ({setRoute}) => {
    const [usersList, setUsersList] = useState([]);
    
    const getAllUsers = async () => {
        const response = await get_users();
        setUsersList(response.data);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return <section>
        <h1>Get All Users</h1>
        <p onClick={() => setRoute("home")}>Home</p>
        { usersList.map((user) => <p key={user.id}>{user.id} {user.firstname} {user.lastname} </p>) }
    </section>
};

export default AllUsers;