import React from 'react';
import UsersList from "../components/UsersList";


const Users = () => {
    const USERS = [
        {id: 'u1', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'A', places: 4},
        {id: 'u2', image: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', name: 'B', places: 0},
        {id: 'u3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU', name: 'C', places: 1},
    ];

    return (
        <UsersList items={USERS}/>
    )
}

export default Users;
