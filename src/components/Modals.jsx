import React from "react"
import { useEffect, useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { addProduct, updateProduct, deleteProduct } from "../functions/firebaseQuerys"

export const AddProductModal = ({close, update}) => {

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const data = {
            name: e.target[0].value,
            fPrice: e.target[2].value,
            qtty: e.target[4].value,
            gain: e.target[6].value,
        }
        await addProduct(data)
        .then(() => {
            setSuccess(true)
        })
    }

    return(
        <div className="modal">
                {success ? (
                    <div className='successDialog'>
                        <h1>Ya se agrego</h1>
                        <Button variant='contained' color='error' onClick={() => {close(); update()}}>Cerrar</Button>
                    </div>
                ):(
                    <form onSubmit={handleSubmit}>
                        <h1>Agregar un Producto</h1>
                        <TextField label='Como se llama el producto?' disabled={loading}/>
                        <TextField label='Cuanto costo el bulto?' type="" disabled={loading}/>
                        <TextField label='Cuantas unidades trae el bulto?' type="number" disabled={loading}/>
                        <TextField label='Que ganancia deseas obtener?' type="number" disabled={loading}/>

                        <div className='Buttons'>
                            <Button variant="contained" type="submit" disabled={loading}>{loading ? (<CircularProgress size={24}/>):(<>Guardar</>)}</Button>
                            <Button variant='contained' color='error' onClick={close} disabled={loading}>Cancelar</Button>
                        </div>
                    </form>
                )}
        </div>
    )
}

export const ChangePriceModal = ({product, close, update}) => {

    useEffect(() => {calculateNewPrice()}, [])
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productInfo, setProductInfo] = useState(product)
    const [oldPrice, setOldPrice] = useState((productInfo.data.fPrice / productInfo.data.qtty) + ((productInfo.data.fPrice / productInfo.data.qtty)*(productInfo.data.gain / 100)))
    const [newPrice, setNewPrice] = useState('')
    const dolar = 39

    const calculateNewPrice = () => {
        const newFprice = Number(fPriceField.value)
        const newQtty = Number(qttyField.value)
        const newGain = Number(gainField.value)
        setNewPrice((newFprice / newQtty) + ((newFprice / newQtty)*(newGain/100)))
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const data = {
            newFprice: Number(fPriceField.value),
            newQtty: Number(qttyField.value),
            newGain: Number(gainField.value),
        }
        updateProduct(productInfo.id, data)
        .then(() => {setSuccess(true)})
    }

    return(
        <div className="modal editProduct">
            {success ? (<div className='successDialog'>
                <h1>Ya se cambio el Precio</h1>
                <Button variant="contained" onClick={() => {close(); update()}} color='error'>cerrar</Button>
            </div>):(
                <form onSubmit={handleSubmit}>
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
                    
                    <TextField label='Cuanto costo el bulto?' type="" onChange={() => calculateNewPrice()} id='fPriceField' disabled={loading} defaultValue={product.data.fPrice}/>
                    <TextField label='Cuantas unidades trae el bulto?' type="number"onChange={() => calculateNewPrice()} id='qttyField' disabled={loading} defaultValue={product.data.qtty}/>
                    <TextField label='Que ganancia deseas obtener?' type="number"onChange={() => calculateNewPrice()} id='gainField' disabled={loading} defaultValue={product.data.gain}/>

                    <div className="Buttons">
                        <Button variant="contained" onClick={close} color='error' disabled={loading}>Cancelar</Button>
                        <Button variant="contained" type="submit" disabled={loading}>{loading ? (<CircularProgress size={24}/>):(<>guardar</>)}</Button>
                    </div>
                </form>
            )}
            
        </div>
    )
}

export const DeleteProductModal = ({product, close, update}) => {

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function handleConfirm(){
        setLoading(true)
        deleteProduct(product.id)
        .then(() => setSuccess(true))
        .catch(() => setError(true))
    }

    return(
        <div className='modal'>
            {success ? (
                <div className='successDialog'>
                    <h1>Ya se borro</h1>
                    <Button variant="contained" onClick={() => {close(); update()}}>Cerrar</Button>
                </div>
            ):(
                <div className="successDialog">
                    <h1>Seguro de que deseas borrar {product.data.name}?</h1>
                    {error && <h1>Tenemos problemas, intenta mas tarde</h1>}
                    <div className="Buttons">
                        <Button variant='contained' onClick={close} color='error' disabled={loading}>Cancelar</Button>
                        <Button variant='contained' onClick={handleConfirm} disabled={loading}>{loading ? (<CircularProgress/>):(<>Borrar</>)}</Button>
                    </div>
                </div>
            )}
        </div>
    )
}