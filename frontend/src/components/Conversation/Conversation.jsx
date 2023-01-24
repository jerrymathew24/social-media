import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest.js'


const Conversation = ({data, currentUserId}) => {
const [userData, setUserData] = useState(null)

    useEffect(()=> {

        const userId = data.members.find((id)=>id!==currentUserId)
        console.log(userId)
        const getUserData = async ()=> {
          try
          {
              const {data} =await getUser(userId)
             setUserData(data)
             console.log(data,"setuserdata")
          }
          catch(error)
          {
            console.log(error)
          }
        }
    
        getUserData();
      }, [])
  return (
    <>
    <div>Conversation</div>
    </>
  )
}

export default Conversation