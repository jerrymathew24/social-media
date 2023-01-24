import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequests.js'
import Conversation from '../../components/Conversation/Conversation.jsx'
 import LogoSearch from '../../components/LogoSearch/LogoSearch.jsx'
import './Chat.css'

const Chat = () => {

   const {user} = useSelector((state)=> state.authReducer.authData)
  
   const [chats, setChats] = useState([])


// Get the chat in chat section
  useEffect(()=>{
     const getChats = async ()=> {
      try {
        const {data} = await userChats(user._id)
        setChats(data)
      } catch (error) {
       console.log(error)
       }
     }
     getChats()
   },[user._id])

  return (
    <div className="Chat">
      {/* Left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">
            {chats.map((chat) => (
              <div>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                />
              </div>
            ))}
        </div>
      </div>
      </div>
      {/* Right side */}
      <div className="Right-side-chat">
        <h2>right side</h2>
      </div>
    </div>
  )
}

export default Chat