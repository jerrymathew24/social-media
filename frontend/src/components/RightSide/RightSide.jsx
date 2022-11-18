import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {GoComment} from 'react-icons/go'
import {SlSettings} from 'react-icons/sl'
import TrendCard from '../TrendCard/TrendCard'

const RightSide = () => {
  return (
    <div className="RightSide">
        <div className="navIcons">
            <img src={Home} alt="" />
            <SlSettings/>
            <IoMdNotificationsOutline />
            <GoComment />
        </div>

        <TrendCard />

        <button className='button r-button'>
            Share
        </button>
    </div>
  )
}

export default RightSide