import React, { useEffect } from 'react'
import './Posts.css'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post.jsx'
import { getTimelinePosts } from '../../actions/PostAction.js'


const Posts = () => {


  const dispatch = useDispatch()
  // fetching user,posts from redux store(global state)
  const user = useSelector((state)=> state.authReducer.authData)
  let {posts, loading } = useSelector((state)=> state.postReducer)

  
  //to fetch posts at the start of app //calling action
  useEffect(()=> {
    //const userIdd = user.data.user._id
    dispatch(getTimelinePosts(user.data.user._id))
    //console.log(user.data.user._id,'userid')
    //console.log(user,'user')
    //console.log(userId,'userid')
    //console.log(user.data.user._id,'userrrrrrrrriiiiiiiidddddddd')
    //console.log(posts, 'possssssssssst')

  },[])


 return (
    <div className="Posts"> 
        {loading ? 'Fetching Posts' 
        : posts.map((post, id)=>{
          //console.log(post,'post')
          //console.log(id,'postid')
            return <Post data={post} userId={post.userId}  id={id} key={id} />
            
        })}
    </div>
  )
}

export default Posts