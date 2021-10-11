import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Friend from '../Friend/Friend';

const Home = () => {
    const [friends, setfriends] = useState([]);
    const history = useHistory();
    const handleNewFriend = () =>{
      history.push("/extrafriend");
    }

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(data => setfriends(data))
  },[])
    return (
        <div>
            <h1>friends number= {friends.length}</h1>
            <button onClick={handleNewFriend}>newFriend</button>
            {
                friends.map(friend=> <Friend friend={friend}></Friend>)
            }
            
        </div>
    );
};

export default Home;