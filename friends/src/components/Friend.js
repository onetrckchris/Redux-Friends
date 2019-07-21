import React from 'react';
import styled from 'styled-components';

const FriendCard = styled.div`
    width: 375px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 15px;
`;

const Friend = ({friend}) => {
    return (
        <FriendCard>
            <h3>{friend.name}</h3>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
        </FriendCard>
    )
}

export default Friend;