import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";
import { AddProductModal } from '../components/AddProductModal';
import { getAllProducts} from '../functions/firebaseQuerys';

const ProductList = () => {

    const [addModal, setAddModal] = useState(false)

    const dolar = 39

    let showList = []

    return(
        <div className='ProductList'>
            <h1>Lista de Productos</h1>
            
            <div className='SearchBar'>
                <form>
                    <TextField label='Que producto buscas?'/>
                    <Button variant='contained'>Buscar</Button>
                </form>

                <div className='Buttons'>
                    <Button variant='contained'>Mostrar todo</Button>
                    <Button variant='contained' onClick={() => setAddModal(true)}>Agregar Producto</Button>
                </div>
            </div>
            
            <div className="ProductContainer">
                {infoPrueba.map((product) => <div className='product'>
                    <h3>{product.name}</h3>
                    <h3>${(product.precioPack / product.packQtty).toFixed(2)}</h3>
                    <h3>Bs.{((product.precioPack / product.packQtty)*dolar).toFixed(2)}</h3>
                    <Button variant='contained'>Cambiar precio</Button>
                </div>)}
            </div>
            {addModal && <AddProductModal close={() => setAddModal(false)}/>}
        </div>
    )
}

export default ProductList;