import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from './colorful-loading.gif'
const UserList = (props) => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [spinner , setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const result = response.data
                setUsers(result)
                setSpinner(false)
            } )
            .catch((err) => {
                alert(err.message)
            })
        },1000)      
    },[])

    const handleSearch = (e) => {        
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <div>
            {
                spinner ? (
                    <>
                       <img src={logo} alt="loading" width="100px" length="100px"  />
                    </>
                ) : (
                     <>
                        
                        <div className='mt-3' style={{ width: 800}}>
                             <h2>USERS LIST: { users.length } </h2>
                             <form>
                                <div className="">
                                     <input type="text" placeholder="search user here"  value={search}  onChange={handleSearch}  />
                                </div>
                             
                             </form>
                        <ul style ={{ textDecorationLine: 'none' }}>
                            {
                                users.sort((a,b) => { 
                                    return a.name.localeCompare(b.name)
                                }).filter((ele) => {
                                    return ele.name.toLowerCase().includes(search)
                                }).map((user) =>{
                                        return <li key={user.id}  style ={{ textDecorationLine: 'none' }} ><Link to={`/users/${user.id}`}>{user.name}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                     </>
                )
            }    
        </div>
    )
}

export default UserList  