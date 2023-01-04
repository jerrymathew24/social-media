import React from 'react'
import Logo from '../../img/p.jpg'
import { BsSearch } from 'react-icons/bs'
import './LogoSearch.css'

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
        <img className='Logo' src={Logo} alt="" />
        <div className="Search">
            <input type="text" placeholder='#Explore' />
            <div className="s-icon">
            <BsSearch />
            </div>
        </div>
    </div>
  )
}

export default LogoSearch