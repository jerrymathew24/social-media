import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Posts.css'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post.jsx'
import { getTimelinePosts } from '../../actions/PostAction.js'


const Posts = () => {


  const dispatch = useDispatch()
  // fetching user,posts from redux store(global state)
  const {user} = useSelector((state)=> state.authReducer.authData)
  let {posts, loading } = useSelector((state)=> state.postReducer)
  const params = useParams()
  
  //to fetch posts at the start of app //calling action
  useEffect(()=> {
    dispatch(getTimelinePosts(user._id))
  },[])

if(!posts) return "no posts"
if(params.id) posts = posts.filter((post) => post.userId === params.id)
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