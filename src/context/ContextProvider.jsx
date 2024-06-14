import { AppContext } from "./AppContext";
import { useState } from "react";

const AppContextProvider = ({children}) => {

    const [productList, setProductList] = useState([])
    const [dollarPrice, setDollarPrice] = useState(0)

    return(
        <AppContext.Provider value={{
            productList,
            setProductList,
            dollarPrice,
            setDollarPrice
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider; 