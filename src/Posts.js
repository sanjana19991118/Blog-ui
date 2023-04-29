import React, { useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from './colorful-loading.gif'
import logo1 from './article.jpg'

const Posts = (props) => {
    const [posts , setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(10)
    const [search, setSearch] = useState('')
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                const result = response.data
                setPosts(result)
                setSpinner(false)
            })
            .catch((err) => {
               alert(err.message)
            })
        }, 1000)
    })

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())
    }
    return (
       <div> {
               spinner ? (
                   <img src={logo} alt="colorful-loading.gif"  width="300px" length="300px" />
               )
               :
               (
                 <>
                       <div className="mt-3" style={{width: 800}}>
                        <h1> Total Posts : {posts.length} </h1> 
                        <form>
                            <div className="mx-2" style={{width: 200}}>
                                 <input  type="search" placeholder="search post here" value={search}   className="form-control"  onChange={handleSearch}  />
                            </div>
                        </form>

                        <div className="row mt-3 ">
                            {
                              posts.filter((ele) => {
                                 return ele.title.toLowerCase().includes(search)
                              }).slice(0, showPosts).map((ele) => {
                                 return <div className="col-md-3 mx-5 mb-2"> 
                                          <div  className="card" style={{width: 250}}>
                                            <img src={logo1}  className='card-img-top' alt="article" />
                                            <div className='card-body'>
                                                <Link to={`/posts/${ele.id}`}><h5>{ele.title}</h5></Link>
                                            </div>
                                          </div>
                                        </div>
                                    
                              })

                          }
                        </div>
                          
                         
                            {/* <ul className="list-inline mt-3">
                            {
                                posts.filter((ele) => {
                                    return ele.title.toLowerCase().includes(search)
                                }).slice(0, showPosts).map((ele) => {
                                    return <li key={ele.id} className="card list-inline-item">
                                            <Link to={`/posts/${ele.id}`}>{ele.title}</Link>
                                        </li>
                                })
                            }
                            </ul> */}
                               
                        
                        <button onClick={() => { 
                            setShowPosts(showPosts + 10)
                        }} className="mx-2 btn btn-primary" style={{width: 150}}>Show more</button>
                 
                       </div>
                       
                 
                 </>
               )
           
             }
           
            
      </div>
    )
}

export default Posts 