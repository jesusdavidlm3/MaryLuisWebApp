import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';
import { getDollarPrice } from '../functions/firebaseQuerys';

const Root = () => {

    const {setDollarPrice} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => navigate('/home'), [])
    useEffect(() => {
        async function getPrice(){
            setDollarPrice(await getDollarPrice())
        }

        getPrice()
    }, [])

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