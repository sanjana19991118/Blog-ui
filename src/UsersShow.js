import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const UsersShow = (props) => {
    const [user , setUser] = useState([]) 
    const [posts, setPosts] = useState([])
    const { id } = props.match.params

    useEffect(() => {
        Promise.all([axios.get(`https://jsonplaceholder.typicode.com/users/${id}`) , axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)])
            .then((values) => {
                const [userResponse , postResponse] = values  
                setUser(userResponse.data)    
                setPosts(postResponse.data)
            })
            .catch((err) => {
                alert(err.message)
            })
        
    },[])
    return (
        <div>
            <h2>USER NAME: {user.name}</h2>

            <h3>POSTS WRITTEN BY USER</h3>
            <ul>
                {
                    posts.map((post) => {
                        return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>

                    })
                }
            </ul>
        </div>
    )
}

export default UsersShow 

// // axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//         //    .then((response) => {
//         //        const result = response.data
//         //        setUser(result)
//         //    })
//         //    .catch((err) => {
//         //       alert(err.message)
//         //    })
//         axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
//           .then((response) => {
//              const result = response.data
//              console.log(result)
//              setPosts(result)
//              result.forEach(ele => {
//                  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//                  .then((response) =>{
//                     const result = response.data
//                     console.log(result)
//                     setUser(result)
//                  })
//              })
//           })
//           .catch((err) => {
//              alert(err.message)
//           })