import React, { useEffect } from 'react'
import './Posts.css'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post.jsx'
import { getTimelinePosts } from '../../actions/PostAction.js'


const Posts = () => {


  const dispatch = useDispatch()
  // fetching user,posts from redux store(global state)
  const {user} = useSelector((state)=> state.authReducer.authData)
  let {posts, loading } = useSelector((state)=> state.postReducer)
//console.log(user,'user from posts.jsx')
  
  //to fetch posts at the start of app //calling action
  useEffect(()=> {
    dispatch(getTimelinePosts(user._id))
  },[])


 return (
    <div className="Posts"> 
        {loading ? 'Fetching Posts' 
        : posts.map((post, id)=>{
          
            return <Post data={post} userId={post.userId}  id={id} key={id} />
            
        })}
    </div>
  )
}

export default Posts