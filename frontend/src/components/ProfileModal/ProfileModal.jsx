import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction.js';
import { updateUser } from '../../actions/userAction.js';
import './ProfileModal.css'


function ProfileModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();

const {password,...others} = data;
const [formData,setFormData] = useState(others);
const [profileImage,setProfileImage] = useState(null);
const [coverImage,setCoverImage] = useState(null)
const dispatch = useDispatch();
const param = useParams()
const user = useSelector((state)=> state.authReducer.authData)
 


const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value})

}



// image cover image and profile image

const onImageChange = (event)=>{
  if(event.target.files && event.target.files[0]){
    let img = event.target.files[0]

    event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img)
  }
}

// handleSubmit
const handleSubmit = (e) =>{
  e.preventDefault();
  let UserData = formData;
  console.log(UserData,'ithanu userdata')

  if(profileImage){
    const data = new FormData()
    //console.log(data,'ithanu data')
    const fileName = Date.now() + profileImage.name;
    // console.log(fileName,"filename of profile img")
 
    data.append("name",fileName) ;
    data.append("file",profileImage);
    UserData.profilePicture = fileName;

    try {
      dispatch(uploadImage(data))
      console.log(data,'upload noww')
    } catch (error) {
      console.log(error);
    }
  }
  if(coverImage){
    const data = new FormData();
    const fileName = Date.now() + coverImage.name;
    data.append("name",fileName);
    data.append("file", coverImage);
    UserData.coverPicture =fileName;
    try {
      dispatch(uploadImage(data))
      console.log(data,"modallll");
      
    } catch (error) {
      console.log(error);
    }

  }
  
  dispatch(updateUser(param.id,UserData));
  setModalOpened(false)
  
}





return (
  <Modal
    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    overlayBlur={3}
    size = '45%'
    opened ={modalOpened}
    onClose ={()=> setModalOpened(false)}
  >
    <form className="infoForm"> 
      <h3>Your Info</h3>

      <div>
          <input type="text" 
          className="infoInput" 
          name='firstname'
           placeholder='First Name' 
           onChange={handleChange}
           value ={formData.firstName}
           />

          <input type="text"
           className="infoInput"
            name='lastname'
             placeholder='Last Name'
             onChange={handleChange}
             value ={formData.lastName}
             />

      </div>
      <div>

      <input type="text"
       className="infoInput"
        name='worksAt'
         placeholder='Work At'
         onChange={handleChange}
         value ={formData.worksAt}
         />

      </div>
      <div>
      <input type="text" 
      className="infoInput" 
      name='livesin'
       placeholder='Lives In' 
       onChange={handleChange}
       value ={formData.livesin}
       />

      <input type="text"
       className="infoInput" 
       name='country' 
       placeholder='Country'
       onChange={handleChange}
       value ={formData.country}
       />
      </div>

      <div>
          <input type="text" 
          className='infoInput'
           name='relationship' 
           placeholder='Relationship Status'
           onChange={handleChange}
           value ={formData.relationship}
           />
      </div>


      <div className='inputFile'>
            <span>Profile Image</span>
            <input type="file" name="profileImage" onChange={onImageChange} />
            <span>Cover Image</span>
            <input type="file" name="coverImage" id="" onChange={onImageChange} />
        </div>
      </form>


      <button className="button infoButton" onClick={handleSubmit}>Update</button>
      
    </Modal>
  );
}

export default ProfileModal