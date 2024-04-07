import React from "react"
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

        // const data = {
        //     name: e.target[0].value,
        //     price: (packPrice/qtty)+((packPrice/qtty)*(percent/100)),
        // }
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