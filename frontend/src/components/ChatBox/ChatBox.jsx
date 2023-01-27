import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { addMessage,  getMessages } from '../../api/MessageRequests'
import { getUser } from '../../api/UserRequest'
import "./ChatBox.css";
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatBox = ({chat, currentUser, setSendMessage, receiveMessage }) => {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const scroll = useRef()

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

        //fetching data for header of chatBox
        useEffect(()=>{
        
          const userId = chat?.members?.find((id)=>id!==currentUser)
          const getUserData = async ()=> {
              try
              {
                  const {data} =await getUser(userId)
                 setUserData(data)
              }
              catch(error)
              {
                console.log(error)
              }
            }
            if(chat !== null) getUserData()
          },[chat, currentUser])
      
 
    //fetching data for messages
    useEffect(()=>{
      const fetchMessages = async ()=>{
        try {
          const {data} = await getMessages(chat._id)
          setMessages(data)
        } catch (error) {
          console.log(error)
        }
      }
      if(chat !== null) fetchMessages()
    }, [chat])


    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }    
    
 
    //send message

    const handleSend = async (e)=>{
      e.preventDefault()
      const message = {
        senderId : currentUser,
        text : newMessage,
        chatId : chat._id
      }   

 // to chat in real time ----- send message to socket server
 const receiverId = chat.members.find((id) => id !== currentUser)
 setSendMessage({...message, receiverId})
 

      //send message to database

      try {
        const {data}   = await addMessage(message)
        setMessages([...messages, data])
        setNewMessage('')
      } catch  {
        console.log('error')
      }
    }

   

    //to receive message from parent component
    useEffect(()=>{

      if(receiveMessage !== null  && receiveMessage?.chatId === chat._id)
      setMessages([...messages, receiveMessage])

    },[receiveMessage])

//always scroll to last message
useEffect(()=>{
  scroll.current?.scrollIntoView({ behavior: 'smooth' })
},[messages])




  return (
    <>
    <div className="ChatBox-container">
      {chat ? (
        <>
        <div className="chat-header">
            <div className="follower">
            <div >
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.9rem" }}>
            <span>
                {userData?.firstname} {userData?.lastname}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </div>

        {/* chat box messages */}

        <div className="chat-body">
            {messages.map((message)=>{
            return(
              <>
              <div ref = {scroll} className= {message.senderId === currentUser ? "message own" : "message"} >
              
                      <span>{message.text}</span>
                      <span>{moment(message.createdAt).fromNow()}</span>
                     
              </div>
              </>
            )})}
        </div>

        {/* chat sender */}
        <div className="chat-sender">
          <div className="">+</div>
          <InputEmoji value = {newMessage} onChange = {handleChange} />
          <div className="send-button button" onClick={handleSend} >
            Send
          </div>
        </div>
        </> ) : (
          <span className='chatbox-empty-message'>
            Tap on a Chat to start Conversation...
          </span>
        )}
    </div>
    </>
  )
}

export default ChatBox 