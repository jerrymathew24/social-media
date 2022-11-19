import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {GoComment} from 'react-icons/go'
import {SlSettings} from 'react-icons/sl'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false) 
  return (
    <div className="RightSide">
        <div className="navIcons">
            <img src={Home} alt="" />
            <SlSettings/>
            <IoMdNotificationsOutline />
            <GoComment />
        </div>

        <TrendCard />

        <button className='button r-button' onClick={()=>setModalOpened(true)} >
            Share
        </button>
        <ShareModal modalOpened={modalOpened}  setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide