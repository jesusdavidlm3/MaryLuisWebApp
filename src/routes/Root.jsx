import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Root = () => {

    const navigate = useNavigate()
    useEffect(() => navigate('/home'), [])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return(
        <ThemeProvider theme={darkTheme}>
            <NavBar />
            <Outlet />
        </ThemeProvider>
    )
}

export default Root;