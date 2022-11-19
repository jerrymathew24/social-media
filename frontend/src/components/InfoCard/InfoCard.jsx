import React, { useState } from 'react'
import './InfoCard.css'
import {BiPencil} from 'react-icons/bi'
import ProfileModal from '../ProfileModal/ProfileModal'


function InfoCard() {


  const [modalOpened, setModalOpened] = useState(false) 


  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>Your Info</h4>
            <div>
              <BiPencil onClick={()=>setModalOpened(true)} />
              <ProfileModal modalOpened={modalOpened}  setModalOpened={setModalOpened} />
            </div>
            
        </div>
        <div className="info">
            <span><b>Status</b></span>
            <span> on a vacation</span>
        </div>

        <div className="info">
            <span><b>Lives in</b></span>
            <span> Kerala</span>
        </div>

        <div className="info">
            <span><b>Interested In</b></span>
            <span> Hiking</span>
        </div>

        <button className='button logout-button'>Logout</button>
    </div>
  )
}

export default InfoCard