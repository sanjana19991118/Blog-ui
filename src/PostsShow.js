import React,{ useState , useEffect} from 'react'
import { Link } from 'react-router-dom'

// import UserList from './UserList'
// import UsersShow from './UsersShow'
import axios from 'axios'
 
const Posts = (props) => {
    const [user,setUser] = useState({})
    const [post, setPost] = useState([])
    // const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    const { id } = props.match.params
   useEffect(() => {
      Promise.all([axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`), axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)])
      .then((values) => {
          const [postResponse , commentsResponse] = values
          setPost(postResponse.data)
          setComments(commentsResponse.data)
        //   console.log(postResponse.data, commentsResponse.data)  
      })
      .catch((err) => {
         alert(err.message)
      })
   },[])
   useEffect(() => {
      if(Object.keys(post).length != 0){
         axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
           .then((res) => {
              console.log("user" , res.data)
              setUser(res.data)
              console.log(user.name)
           })
           .catch((err)=>{
             console.log(err.message)
           })
      }
   }, [post])
   // let userName 
   // user.map((ele) => {
   //    userName = ele.name
   // })


    return (
         <div> 
            <h2>USER NAME: {user.name}</h2>

            <h3>TITLE : {post.title} </h3>
            <h3>BODY : <br/> {post.body}</h3>

            <hr/>
               <h2>COMMENTS</h2>
            <ul>
                {
                    comments.map((ele) => {
                        return <li key={ele.id}>{ele.body}</li>
                    })
                }
            </ul>
            <hr/>
 
           <p><Link to={`/users/${user.id}`}>More Posts of author : { user.name } </Link></p>
           {/* <Route path='/users/:id' component={UsersShow} /> */}
          


         </div>
    )
}

export default Posts




// useEffect(() => {
   //      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
   //        .then((response) => {
   //           const result = response.data
   //           setUser(result)
   //        })
   //        .catch((err) => {
   //           alert(err.message)
   //        })
   //      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
   //        .then((response) => {
   //           const result = response.data
   //           setPost(result)
   //        })
   //        .catch((err) => {
   //           alert(err.message)
   //        })
   //      axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
   //        .then((response) => {
   //          const result = response.data
   //          setComments(result)
   //        })
   //        .catch((err) => {
   //           alert(err.message)
   //        })
   //  },[])
