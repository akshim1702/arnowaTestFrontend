import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Logout = () => {
    const history = useHistory()
    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include"
        }).then((res) => {
            console.log(res)
            // history.push('/signup')
            if (res.status != 200) {
                const error = new Error(res.error);
                throw error
            }
        }).catch((err) => {
            console.log(err);
        })
    })
    return (
        <div>Your Seesion Ended
            <NavLink to='/signup'>
                Login Again
            </NavLink>
        </div>
    )
}

export default Logout