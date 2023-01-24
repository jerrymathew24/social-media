import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {GoComment} from 'react-icons/go'
import {SlSettings} from 'react-icons/sl'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import {Link} from 'react-router-dom'


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false) 
  return (
    <div className="RightSide">
        <div className="navIcons">
          <Link to = '../home'>
            <img src={Home} alt="" />
          </Link>
            
            <SlSettings/>

            <IoMdNotificationsOutline />

            <Link to = '../chat'>
              <GoComment />
            </Link>
            
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