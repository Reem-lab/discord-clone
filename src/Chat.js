import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import './chat.css';
import db from './firebasefile';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelID, selectChannelName } from './features/appSlice';

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelID);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
     if(channelId){
      db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestampe", "desc")
      .onSnapshot((snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data() ))
      );
     }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    db.collection('channels').doc(channelId).collection("messages").add({
      timestampe: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    })
 
    setInput("");
  };

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName} />

      <div className='chat__messages'>
        {
           messages.reverse().map((message) => (
            <Message
              key={message.id}
              timestampe={message.timestampe}
              user={message.user}
              message={message.message}
            />
           ))
        }
      </div>

      <div className='chat__input'>
        <AddCircleIcon />
        <form>
           <input 
           placeholder={`Message#${channelName}`}
           value={input}
           disabled={!channelId}
           onChange={(e) => setInput(e.target.value)}
           />
           <button 
           type='submit' 
           className='chat__inputButton'
           disabled={!channelId}
           onClick={sendMessage}
           >
             Send Message
           </button>
        </form>

        <div className='chat__inputIcons'>
           <CardGiftcardIcon />
           <GifIcon />
           <EmojiEmotionsIcon />
        </div>

      </div>
    </div>
  )
}

export default Chat
