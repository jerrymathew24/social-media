import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userChats } from "../../api/ChatRequests.js";
import Home from "../../img/home.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import {GoComment} from 'react-icons/go'
import { SlSettings } from "react-icons/sl";
import Conversation from "../../components/Conversation/Conversation.jsx";
import LogoSearch from "../../components/LogoSearch/LogoSearch.jsx";
import "./Chat.css";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import { io } from 'socket.io-client'
import { useRef } from "react";





const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()

  //sending message to socket server
  useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message', sendMessage)
    }
  })

// subscribing socket.io and get the online users
  useEffect(()=> {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user._id )
    socket.current.on('get-users', (users)=> {
      setOnlineUsers(users)
    })
  }, [user])


//receive message from socket server
useEffect(()=>{
  socket.current.on('receive-message', (data)=> {
    setReceiveMessage(data)
  })
},[])


  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  return (
    <div className="Chat">
      {/* Left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={()=> setCurrentChat(chat)} >
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="Right-side-chat">
        <div className="" style={{width:'20rem', alignSelf:'flex-end'}}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>

            <SlSettings />

            <IoMdNotificationsOutline />

            <Link to = '../chat'>
              <GoComment />
            </Link>
          </div>
          </div>
          {/*  chat body */}
          <ChatBox chat= {currentChat} currentUser = {user._id}  setSendMessage = {setSendMessage} receiveMessage = {receiveMessage} />
        
      </div>
    </div>
  );
};

export default Chat;
