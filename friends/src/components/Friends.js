import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AddFriendForm from './AddFriendForm';
import Friend from './Friend';
import { LoginButton } from './Login';

const FriendsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Friends = props => {
    const [friends, setFriends] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const url = 'http://localhost:5000/api/friends';
        axios.get(url, {
            headers: { Authorization: token }
        })
            .then(response => {
                setDataReceived(true);
                setFriends(response.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            {!dataReceived ? <h1>Loading...</h1> :
                <div>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        props.history.push('/');
                    }}>Logout</button>
                    <Link to="/add-friend">Add New Friend</Link>
                    <FriendsContainer>
                        {friends.map(friend => (
                            <Friend key={friend.id} friend={friend} />
                        ))}
                    </FriendsContainer>
                </div>
            }
        </>
    )
}

export default Friends;