import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect } from 'react'

const Root = () => {

    const navigate = useNavigate()
    useEffect(() => navigate('/home'), [])

    return(
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Root;