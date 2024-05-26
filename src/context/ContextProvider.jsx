import { AppContext } from "./AppContext";
import { useState } from "react";

const AppContextProvider = ({children}) => {

    const [productList, setProductList] = useState([])

    return(
        <AppContext.Provider value={{
            productList,
            setProductList
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider; 