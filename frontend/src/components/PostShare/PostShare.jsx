import React, { useState, useRef } from 'react'
import './PostShare.css'
import ProfileImage from '../../img/dj.jpg'
import {FaPhotoVideo} from 'react-icons/fa'
import {MdLocationPin} from 'react-icons/md'
import {CgCalendarDates} from 'react-icons/cg'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { uploadImage, uploadPost } from '../../actions/UploadAction.js'
import { Image } from '@mantine/core'



const PostShare = () => {

    const loading = useSelector((state)=>state.postReducer.uploading)
    const { user } = useSelector((state)=>state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    // to fetch the desc value of new post we don't have the state in redux store so we use useRef() 
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
          userId : user._id,
          desc :desc.current.value
        } 

        if(image){
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            //here the image is saved only by the file name and not actually by the image bcoz in the post model we have given the type of image as string only
            newPost.image = filename
            try {
                //dispatching the image with uploadImage action
                
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