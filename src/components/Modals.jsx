import React from "react"
import { useEffect, useState } from "react"
import { TextField, Button } from "@mui/material"
import { addProduct } from "../functions/firebaseQuerys"

export const AddProductModal = ({close}) => {

    async function handleSubmit(e){
        e.preventDefault()
        const data = {
            name: e.target[0].value,
            fPrice: e.target[2].value,
            qtty: e.target[4].value,
            gain: e.target[6].value,
        }

        await addProduct(data)
    }

    return(
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h1>Agregar un Producto</h1>
                <TextField label='Como se llama el producto?'/>
                <TextField label='Cuanto costo el bulto?' type=""/>
                <TextField label='Cuantas unidades trae el bulto?' type="number"/>
                <TextField label='Que ganancia deseas obtener?' type="number"/>

                <div className='Buttons'>
                    <Button variant="contained" type="submit">Guardar</Button>
                    <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
                </div>
            </form>
        </div>
    )
}

export const ChangePriceModal = ({product, close}) => {

    const [productInfo, setProductInfo] = useState(product)
    const [oldPrice, setOldPrice] = useState((productInfo.data.fPrice / productInfo.data.qtty) + ((productInfo.data.fPrice / productInfo.data.qtty)*(productInfo.data.gain / 100)))
    const [newPrice, setNewPrice] = useState('')
    const dolar = 39

    const calculateNewPrice = () => {
        console.log('se esta ejecutando')
        const newFprice = Number(fPriceField.value)
        const newQtty = Number(qttyField.value)
        const newGain = Number(gainField.value)
        setNewPrice((newFprice / newQtty) + ((newFprice / newQtty)*(newGain/100)))
    }

    return(
        <div className="modal editProduct">
            <form>
                <h1>{productInfo.data.name}</h1>

                <div className="comparison">
                    <div className="panel">
                        <h4>Precio anterior: ${oldPrice.toFixed(2)}</h4>
                        <h4>Precio anterior: Bs. {(oldPrice * dolar).toFixed(2)}</h4>
                    </div>
                    <div className="panel">
                        <h4>Precio nuevo: ${Number(newPrice).toFixed(2)}</h4>
                        <h4>Precio nuevo: Bs. {(newPrice * dolar).toFixed(2)}</h4>
                    </div>
                </div>
                
                <TextField label='Cuanto costo el bulto?' type="" onChange={() => calculateNewPrice()} id='fPriceField'/>
                <TextField label='Cuantas unidades trae el bulto?' type="number"onChange={() => calculateNewPrice()} id='qttyField'/>
                <TextField label='Que ganancia deseas obtener?' type="number"onChange={() => calculateNewPrice()} id='gainField'/>

                <div className="Buttons">
                    <Button variant="contained" onClick={close}>Guardar</Button>
                    <Button variant="contained" onClick={close}>Cancelar</Button>
                </div>

                </form>
        </div>
    )
}