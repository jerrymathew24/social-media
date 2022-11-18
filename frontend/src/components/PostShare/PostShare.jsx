import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImage from '../../img/profileImg.jpg'
import {FaPhotoVideo} from 'react-icons/fa'
import {MdOndemandVideo } from 'react-icons/md'
import {MdLocationPin} from 'react-icons/md'
import {CgCalendarDates} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'

const PostShare = () => {

    const [image, setImage] = useState(null)
    const imageRef = useRef()

    const onImageChange = (event)=> {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setImage({
                image: URL.createObjectURL(img)
            })
        }
    }

  return (
    
    <div className="PostShare">
        <img src={ProfileImage} alt="" />
        <div >
            <input type="text" placeholder="What's happening" />
            <div className="postOptions">
            <div className="option"
            style={{color: "var(--photo)"}}
            onClick={()=>imageRef.current.click()}
            >
            <FaPhotoVideo/>
            Photo
            </div>
            <div className="option"
            style={{color: "var(--video)"}}>
            <MdOndemandVideo />
            Video
            </div>
            <div className="option"
            style={{color: "var(--location)"}}>
            <MdLocationPin />  
            Location
            </div>
            <div className="option"
            style={{color: "var(--schedule)"}}>
            <CgCalendarDates /> 
            Schedule
            </div>
            <button className='button ps-button'>
                Share
            </button>
            <div style={{ display:"none"}}>
                <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
            </div>
        </div>
        {
            image && (
                <div className="previewImage">
                    <AiOutlineClose onClick={()=>setImage(null)}/>
                    <img src={image.image} alt="" />
                </div>
            )
        }


        </div>
    
    </div>
  )
}

export default PostShare