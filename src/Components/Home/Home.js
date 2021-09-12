import React from 'react';
import { useEffect, useState } from 'react';
import Friend from '../Friend/Friend';

const Home = () => {
    const [friends, setfriends] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(data => setfriends(data))
  },[])
    return (
        <div>
            <h1>friends number= {friends.length}</h1>
            {
                friends.map(friend=> <Friend friend={friend}></Friend>)
            }
            
        </div>
    );
};

export default Home;