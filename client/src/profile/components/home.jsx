import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import List from '../../utils/list'

const Home = ({ user, logout, todos }) => {
  if(!user){
      return (<Redirect to='/'/>)
  }
  const addpath = `/profile/${user.username}/add`
  const homepath = `/profile/${user.username}`
    return(
        <div>
            <nav>
                <Link to={addpath}>ADD</Link>
                {" "}
                <Link to={homepath}>HOME</Link>
            </nav>
            <h1>WELCOME BACK USER {user.username}</h1>
            <List username={user.username} items={todos}/>
            <button onClick={() => logout()}>LOGOUT</button>
        </div>
    )
}

export default Home