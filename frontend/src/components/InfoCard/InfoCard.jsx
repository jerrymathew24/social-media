import React from 'react'
import './InfoCard.css'
import {BiPencil} from 'react-icons/bi'
function InfoCard() {
  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>Your Info</h4>
            <div>
              <BiPencil />
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
            <span><b>Student at</b></span>
            <span> Kerala University</span>
        </div>

        <button className='button logout-button'>Logout</button>
    </div>
  )
}

export default InfoCard