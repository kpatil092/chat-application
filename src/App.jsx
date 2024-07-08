import React, { useEffect } from 'react'
import Chats from './components/chats/Chats'
import Details from './components/details/Details'
import Lists from './components/lists/Lists'
import Login from './components/login/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'


function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    });

    // returning clean-up function 
    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  console.log(currentUser);

  if(isLoading) return <div className='loading'>Loading...</div>

  return (
    <div className='container'>
      {
        // currentUser ? (
          <>
            <Lists />
            {chatId && <Chats />}
            {chatId && <Details />}
          </>
        // ) : (<Login />)
      }
      <Notification/>
    </div>
  )
}


export default App
