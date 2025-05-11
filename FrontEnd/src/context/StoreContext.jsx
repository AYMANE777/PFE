import {createContext, useEffect, useState} from "react";
import axios from "axios";

const StoreContext = createContext(null);


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5000";
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}));
        } else {
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId of Object.keys(cartItems)) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = food_list.find((product) => product._id == itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
        setFood_list(response.data.data);

    }
    useEffect(() => {

        async function LoadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        LoadData();
    },[])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export { StoreContextProvider, StoreContext };