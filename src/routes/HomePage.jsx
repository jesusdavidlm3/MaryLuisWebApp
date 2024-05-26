import React from 'react'
import Logo from '../img/logo.png'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { getAllProducts } from '../functions/firebaseQuerys'

const HomePage = () => {

    const {setProductList} = useContext(AppContext)

    useEffect(() => {
        async function getData(){
            setProductList(await getAllProducts())
        }

        getData()
    }, [])

    return(
        <div className="HomePage">
            <img src={Logo}/>
        </div>
    )
}

export default HomePage;