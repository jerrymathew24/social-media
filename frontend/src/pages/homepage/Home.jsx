import React from 'react'
import ProfileSide from '../../components/profile/ProfileSide'
import './Home.css'

const Home = () => {
  return (
    <div className="Home">
        < ProfileSide />
        <div className="postSide">Posts</div>
        <div className="RightSide">Right side </div>
    </div>
  )
}

export default Home