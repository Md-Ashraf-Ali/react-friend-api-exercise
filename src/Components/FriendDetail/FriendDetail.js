import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FriendDetail = () => {
    const {id} = useParams();
    const [friend, setfriend] = useState({});

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res=>res.json())
        .then(data=>setfriend(data))
    },[])
    return (
        <div>
            <h3>this is friend id {id}</h3>
            <p>friend name: {friend.name}</p>
            <p>friend email: {friend.email}</p>

        </div>
    );
};

export default FriendDetail;