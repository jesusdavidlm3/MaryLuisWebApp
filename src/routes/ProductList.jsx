import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Fab } from "@mui/material";
import { AddProductModal, ChangePriceModal, DeleteProductModal } from '../components/Modals';
import { getAllProducts, searchProducts } from '../functions/firebaseQuerys';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../context/AppContext';
import { capitalize } from '../functions/normalizeInfo';

const ProductList = () => {

    const { productList, setProductList } = useContext(AppContext)
    const [showList, setShowList] = useState(productList)
    const [addModal, setAddModal] = useState(false)
    const [changePriceModal, setChangePriceModal] = useState(false)
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const dolar = 39
    const [selectedProduct, setSelectedProduct] = useState('')

    async function handleChangePrice(product){
        setSelectedProduct(product)
        setChangePriceModal(!changePriceModal)    
    }

    async function handleDelete(product){
        setSelectedProduct(product)
        setDeleteProductModal(!deleteProductModal)
    }

    async function closeAddProduct(){
        setAddModal(false)
    }

    const handleSearch = (e) => {
        const results = []
        if(e.target.value == ''){
            setShowList(productList)
        }else{
            productList.forEach(item => {
                if(item.data.name.includes(e.target.value)){
                    results.push(item)
                }else if(item.data.name.includes(capitalize(e.target.value))){
                    results.push(item)
                }
            })
            setShowList(results)
        }
    }

    return(
        <div className='ProductList'>
            <h1>Lista de Productos</h1>
            
            <div className='SearchBar'>
                {/* <form> */}
                    <TextField label='Que producto buscas?' onChange={handleSearch} id='lookedProduct'/>
                {/* </form> */}

                {/* <div className='Buttons'> */}
                    {/* <Button variant='contained' onClick={() => getList()}>Mostrar todo</Button> */}
                    <Button variant='contained' onClick={() => setAddModal(true)}>Agregar Producto</Button>
                {/* </div> */}
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