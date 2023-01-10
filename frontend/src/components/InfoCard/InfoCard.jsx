import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { BiPencil } from 'react-icons/bi'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'


function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})

  const user = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.data.user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser, console.log(profileUser,'profileuser'))
       
      }
    }
    fetchProfileUser();
  }, [user])


 const  handleLogout =()=>{
  dispatch(logOut())
 }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user.data.user._id === profileUserId ? (<div>
          <BiPencil onClick={() => setModalOpened(true)} />
          <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>) : ("")}


      </div>
      <div className="info">
        <span><b>Status</b></span>
        <span> {profileUser.Status}</span>
      </div>
      

      <div className="info">
        <span><b>Lives in</b></span>
        <span> {profileUser.livesin}</span>
      </div>

      <div className="info">
        <span><b>Interested In</b></span>
        <span> {profileUser.interestedin}</span>
      </div>

      <button className='button logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default InfoCard