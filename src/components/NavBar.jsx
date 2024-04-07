import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate()

    return(
        <div className='NavBar'>
            <Button onClick={() => navigate('products')}>Productos</Button>
            <Button onClick={() => navigate('clients')}>Clientes</Button>
            <Button onClick={() => navigate('config')}>Ajustes</Button>
        </div>
    )
}

export default NavBar;