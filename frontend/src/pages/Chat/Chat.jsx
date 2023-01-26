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

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)

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
          <ChatBox chat= {currentChat} currentUser = {user._id} />
        
      </div>
    </div>
  );
};

export default Chat;
