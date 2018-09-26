import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ items, username }) => {
    return(
        <div>
            {items.map(i => {
                let path=`/profile/${username}/todo/${i._id}`
                return(
                    <p><Link to={path}>{i.task}</Link></p>
                )
            })}
        </div>
    )
}

export default List