import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import Posts from './Posts'
import UserList from './UserList'
import UsersShow from './UsersShow'
import PostsShow from './PostsShow'

const App = (props) => {

    return (
      <div> 
          <nav className='navbar navbar-expand-lg navbar-light bg-light'> 
              <div className="container-fluid">
                <div className="navbar-nav">
                <Link to='/' className='nav-link active'>Home</Link>
                <Link to ='/users' className='nav-link'>Users</Link>
                <Link to='/posts' className='nav-link'>Posts</Link>
                </div>
              </div>
          </nav>
            

            <Route path='/' component={Home} exact={true} />
            <Route path='/users' component={UserList} exact={true} />
            <Route path='/posts' component={Posts}  exact={true}/>
            <Route path='/users/:id' component={UsersShow} />
            <Route path='/posts/:id' component={PostsShow} />
      </div>
    )
}

export default App 

/* 
 0) Home, User , Posts
 1) User List Page 
 2) User Name ( particular User )
 3) display below the Post written by him 
 4) 
 */
