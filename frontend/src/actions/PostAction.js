import * as PostApi from '../api/PostRequest.js'



export const getTimelinePosts = (id)=> async(dispatch)=>{
    //console.log(id,'idddddddddddddddjhv')
    dispatch({type: "RETRIEVING_START"})


    try {


        const data = await PostApi.getTimelinePosts(id)
        //console.log(data,'dataaaaa')
        dispatch({type: "RETRIEVING_SUCCESS", data: data})
        console.log(data)


    } catch (error) {
        dispatch({type: "RETRIEVING_FAIL"})
        //console.log(error)
    }
}