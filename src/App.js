import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { auth } from "./firebasefile"
import SideBar from './SideBar';
import Chat from './Chat';
import Login from './Login';
import { login, logout } from './features/userSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
       //the user is logged in
       if (authUser){
           dispatch(
            login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
           })
           );
       }else {
         // the user is logged out
         dispatch(logout());
       }
    });
  }, [dispatch]);

  return (
    //bem naming convension

    <div className="app">
      { user ? (
        <>
        <SideBar />
        <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
