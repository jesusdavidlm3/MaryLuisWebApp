import React, { useState, useEffect } from 'react'
import { TextField, Button } from "@mui/material";
import { AddProductModal, ChangePriceModal } from '../components/Modals';
import { getAllProducts} from '../functions/firebaseQuerys';

const ProductList = () => {

    const [addModal, setAddModal] = useState(false)
    const [changePriceModal, setChangePriceModal] = useState(false)
    const dolar = 39
    const [showList, setShowList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')

    useEffect(() => {
        async function getList(){
            setShowList(await getAllProducts())
        }
        getList()
    }, [])

    const handleChangePrice = (product) => {
        setSelectedProduct(product)
        setChangePriceModal(!changePriceModal)
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
                    <Button variant='contained'>Mostrar todo</Button>
                    <Button variant='contained' onClick={() => setAddModal(true)}>Agregar Producto</Button>
                </div>
            </div>
            
            <div className="ProductContainer">
                {showList.map((product) => <div className='product' key={product.id}>
                    <h3>{product.data.name}</h3>
                    <h3>${(product.data.fPrice / product.data.qtty).toFixed(2)}</h3>
                    <h3>Bs.{((product.data.fPrice / product.data.qtty)*dolar).toFixed(2)}</h3>
                    <Button variant='contained' onClick={(productId) => handleChangePrice(product)}>Cambiar precio</Button>
                </div>)}
            </div>
            {addModal && <AddProductModal close={() => setAddModal(false)}/>}
            {changePriceModal && <ChangePriceModal product={selectedProduct} close={handleChangePrice}/>}
        </div>
    )
}

export default ProductList;