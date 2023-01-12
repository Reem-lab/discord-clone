import React from 'react';
import { Avatar } from '@material-ui/core';
import './Message.css';

const Message = ({ user, timestampe, message }) => {
  return (
    <div className='message'>
      <Avatar src={user.photo} />
      <div className='message__info'>
          <h4>
            {user.displayName} <span className='message__timeStampe'>
              {new Date(timestampe?.toDate()).toUTCString()}
              </span>
          </h4>
          <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
