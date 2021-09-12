import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Friend = (props) => {
    const{name, email, id} = props.friend;
    const history = useHistory();
    const handleClick = (id) =>{
        history.push(`/friend/${id}`)
    }
    return (
        <div style={{border:'1px solid', margin:'20px', padding:'20px', borderRadius:"10px"}}>
            <h3>friend name: {name}</h3>
            <p>friend email: {email} </p>
            <Link to={`/friend/${id}`}>show detail of {id}</Link><br/><br/>
            <button onClick={()=>handleClick(id)} >click me</button>
        </div>
    );
};

export default Friend;