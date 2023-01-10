import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImage from '../../img/dj.jpg'
import {FaPhotoVideo} from 'react-icons/fa'
// import {MdOndemandVideo } from 'react-icons/md'
import {MdLocationPin} from 'react-icons/md'
import {CgCalendarDates} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { uploadImage, uploadPost } from '../../actions/UploadAction.js'
import { Image } from '@mantine/core'



const PostShare = () => {

    const loading = useSelector((state)=>state.postReducer.uploading)
    const user  = useSelector((state)=>state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    ////////////////////////////////////////////////////
    //console.log(user, 'userrrrrrrrrrrrrr')
    //console.log(user.data.user._id,'idddddddddddddddd')
    ////////////////////////////////////////////////////
    const desc = useRef()
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()


    //img selecting
    const onImageChange = (event)=> {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            setImage(img)
        }
    }

    //reset
    const reset = ()=> {
        setImage(null)
        desc.current.value=''
    }


    //handleClick
    const handleSubmit = (e) =>{
        e.preventDefault();
      
        const newPost = {
          userId : user.data.user._id,
          desc :desc.current.value
        } 
       console.log(newPost,"newPost.......",image,"image")
        

        if(image){
            const data = new FormData()
            const filename = Date.now() + image.name
            console.log(filename,"filename")
            
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            console.log(newPost,'newposttttttttttttt')


            try {
                //dispatching the image
                
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        //dispatching the post details

        dispatch(uploadPost(newPost))

        reset()
    }

  return (
    
    <div className="PostShare">
        <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.webp'} alt="" />
        <div >
        <input
                ref={desc}
                required
                type="text" placeholder="What's happening"  />


            <div className="postOptions">
            <div className="option"
            style={{color: "var(--photo)"}}
            onClick={()=>imageRef.current.click()}
            >
            <FaPhotoVideo/>
            <span>Photo</span> 
            </div>
            <div className="option"
            style={{color: "var(--video)"}}>
            {/* <MdOndemandVideo />
             <span>Video</span>*/}
            </div> 
            <div className="option"
            style={{color: "var(--location)"}}>
            <MdLocationPin />  
             <span>Location</span>
            </div>
            <div className="option"
            style={{color: "var(--schedule)"}}>
            <CgCalendarDates /> 
            <span>Advertisement</span>
            </div>


            <button className='button ps-button'
            onClick={handleSubmit}
            disabled = {loading}>


                {loading ? "Uploading..." : "Share"}
            </button>


            <div style={{ display:"none"}}>
                <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
            </div>
        </div>
        {
            image && (
                <div className="previewImage">
                    <AiOutlineClose onClick={()=>setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )
        }


        </div>
    
    </div>
  )
}

export default PostShare