import React from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import { useState, useContext } from 'react'
import { updateDollarPrice, updatePassword } from '../functions/firebaseQuerys'


const Configs = () => {

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleUpdatePassword(){
        setLoading(true)
        const oldPass = document.getElementById('oldPassField')
        const newPass = document.getElementById('newPassField')
        updatePassword(oldPass.value, newPass.value)
        .then((response) => {
            console.log(response)
            setSuccess(true)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    async function handleUpdateDollar(){
        // const dollarPrice = document.getElementById('dollarPriceField')
        setLoading(true)
        updateDollarPrice(Number(dollarPriceField.value))
        .then((response) => {
            console.log('hola')
            setSuccess(true)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
        console.log(dollarPriceField.value)
    }

    return(
        <div className='ConfigPage'>
            <h1>Configuracion</h1>
            <div className='Config'>
                <h4>Cambiar precio del dolar</h4>
                <TextField label='Precio del dolar' id='dollarPriceField'/>
                <Button variant='contained' onClick={() => handleUpdateDollar()} disabled={loading}>{loading ? (<CircularProgress size={24}/>):('Guardar')}</Button>
            </div>
            <div className='Config'>
                <h4>Cambiar la contraseña</h4>
                <TextField label='Contraseña anterior' type='password' id='oldPassField'/>
                <TextField label='Contraseña nueva' type='password' id='newPassField'/>
                <TextField label='Repita la nueva contraseña' type='password'/>
                <Button variant='contained' onClick={() => updatePassword()}>Guardar</Button>
            </div>

            { success && 
                <div className='modal'>
                    <form>
                        <h1>Listo</h1>
                        <Button variant='contained' color='error' onClick={() => setSuccess(false)}>Cerrar</Button>  
                    </form>      
                </div>
            }

        </div>
    )
}

export default Configs;