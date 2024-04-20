import React, { useState, useEffect } from 'react'
import { TextField, Button, Fab } from "@mui/material";
import { AddProductModal, ChangePriceModal, DeleteProductModal } from '../components/Modals';
import { getAllProducts} from '../functions/firebaseQuerys';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {

    const [addModal, setAddModal] = useState(false)
    const [changePriceModal, setChangePriceModal] = useState(false)
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const dolar = 39
    const [showList, setShowList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')

    async function getList(){
        setShowList(await getAllProducts())
    }

    useEffect(() => {
        getList()
    }, [])

    async function handleChangePrice(product){
        setSelectedProduct(product)
        setChangePriceModal(!changePriceModal)
        if(changePriceModal){
            getList()
        }    
    }

    async function handleDelete(product){
        setSelectedProduct(product)
        setDeleteProductModal(!deleteProductModal)
        if(deleteProductModal){
            getList()
        }
    }

    async function closeAddProduct(){
        setAddModal(false)
        getList()
    }

    return(
        <div className='ProductList'>
            <h1>Lista de Productos</h1>
            
            <div className='SearchBar'>
                <form>
                    <TextField label='Que producto buscas?'/>
                    <Button variant='contained'>Buscar</Button>
                </form>

                <div className='Buttons'>
                    <Button variant='contained' onClick={() => getList()}>Mostrar todo</Button>
                    <Button variant='contained' onClick={() => setAddModal(true)}>Agregar Producto</Button>
                </div>
            </div>
            
            <div className="ProductContainer">
                {showList.map((product) => <div className='product' key={product.id}>
                    <h3>{product.data.name}</h3>
                    <h3>${((product.data.fPrice / product.data.qtty)+((product.data.fPrice / product.data.qtty)*(product.data.gain / 100))).toFixed(2)}</h3>
                    <h3>Bs. {(((product.data.fPrice / product.data.qtty)+((product.data.fPrice / product.data.qtty)*(product.data.gain / 100)))*dolar).toFixed(2)}</h3>
                    <div className='Buttons'>
                        <Button variant='contained' onClick={() => handleChangePrice(product)}>Cambiar precio</Button>
                        <Button variant='contained' color='error' size='small' onClick={() => handleDelete(product)}> <DeleteIcon/> </Button>
                    </div>
                    
                </div>)}
            </div>
            {addModal && <AddProductModal close={closeAddProduct}/>}
            {changePriceModal && <ChangePriceModal product={selectedProduct} close={handleChangePrice}/>}
            {deleteProductModal && <DeleteProductModal product={selectedProduct} close={handleDelete}/>}
        </div>
    )
}

export default ProductList;