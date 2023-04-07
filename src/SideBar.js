import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import './sideBar.css';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebasefile';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SideBar = () => {
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [channelName, setChannelName] = useState('public');
  const [channelPrivacy, setChannelPrivacy] = useState(true);
  const [channelCode, setChannelCode] = useState('');
  const [channels, setChannels] = useState([]);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
    // check if channel has a channelPrivacy property
    {
      if (snapshot.docs.map((doc) => doc.data().channelPrivacy)) {
        // if it does get the channelPrivacy property only for the channels that are private
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
            channelPrivacy: doc.data().channelPrivacy,
          }))
        );
      } else {
        // if it doesn't get the channelPrivacy property for all channels
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
          }))
        );
      }
    });
  }, []);


  const toggleModal = () => {
    setModal(!modal)
  }

  const togglePrivacy = () => {
    setPrivacy(!privacy)
  }


  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  // const handleSubmit = async (e, data) => {
  //   e.preventDefault();
  //   await dispatch(addChannel(data));
  //   navigate('/');
  // }

  const handleAddChannel = (e) => {
    e.preventDefault();

    if (channelName) {
      if (channelPrivacy) {
        if (channelCode === '') {
          alert('Please add a code for the channel')
        } else {
          db.collection('channels').add({
            channelName: channelName,
            channelPrivacy: channelPrivacy,
            channelCode: channelCode
          })
          setChannelName('');
          setChannelPrivacy('');
          setChannelCode('');
          toggleModal();
        }
      } else {
        db.collection('channels').add({
          channelName: channelName,
          channelPrivacy: channelPrivacy,
          channelCode: null
        })
        setChannelName('');
        setChannelPrivacy('');
        setChannelCode('');
        toggleModal();
      }
    } else {
      alert('Please fill in all the fields')
    }
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>Clever programmer</h3>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar__channels'>
        <div className='sidebar_channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={toggleModal} className='sidebar__addchannel' />
        </div>

        {modal && (
          <div className="modal overlay active-modal">
            <div className='modal__header'>
              <h3 className='modal__heading'>ADD A NEW CHANNEL </h3>
              <div>
                <CloseIcon onClick={toggleModal} className="close__Button" />
              </div>
            </div>
            <form className='form' onSubmit={(e) => handleAddChannel(e)}>
              <div className='channel__item'>
                <label className='label__text'>
                  Channel Name :
                </label>
                <input className='input__label' type="text" placeholder='channelname' onChange={(e) => setChannelName(e.target.value)} />
              </div>
              <div className='channel__item'>
                <label className='label__text'>Choose the privacy of the channel : </label>
                <div className='channel__privacy'>
                  <input onClick={togglePrivacy} type="radio" value="private" name="privacy" onChange={(e) => setChannelPrivacy(true)} />
                  <label className='label__text'>Private</label>
                </div>
                {channelPrivacy === 'private' && (
                  <>
                    <label className='label__text'>
                      Add a code for the channel: </label>
                    <input type='text' className='input__label' maxlength="5" placeholder='code' onChange={(e) => setChannelCode(e.target.value)} />
                  </>
                )}
                <div className='channel__privacy'>
                  <input onClick={togglePrivacy} type="radio" value="public" name="privacy" onChange={(e) => setChannelPrivacy(false)} />
                  <label className='label__text'>Public</label>
                </div>
              </div>
              <button className='button__addChannel' type='submit'>Add A new Channel</button>
            </form>
          </div>
        )}

        <div className='sidebar__channelsList'>
          {
            channels.map(({ id, channel }) => (
              <SidebarChannel key={id} id={id} channelName={channel.channelName} />
            ))
          }
        </div>

      </div>

      <div className='sidebar__voice'>
        <SignalCellularAltIcon
          fontSize="large"
          className='sidebar__voiceIcon'
        />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connection</h3>
          <p>Stream</p>
        </div>

        <div className='sidebar__voiceIcons'>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>


    </div>
  )
}

export default SideBar;
