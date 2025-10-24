import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import { addToCart, getCartData, removeQtyFromCart } from "../service/cartService";

export const StoreContext = createContext({
    increaseQty: () => {},
    decreaseQty: () => {},
    quantities: {},
    token: "",
    setToken: () => {}
});

export const StoreContextProvider = (props) => {
    console.log("StoreContextProvider: Initial render");
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setTokenState] = useState(localStorage.getItem("token") || "");
    console.log("StoreContextProvider: Initial token", token);

    const setToken = (newToken) => {
        console.log("setToken: New token received", newToken);
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            console.log("setToken: Calling loadCart()");
            loadCart();
        } else {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            console.log("setToken: Clearing quantities on logout");
            setQuantities({});
        }
    };

    const increaseQty = async(foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
        await addToCart(foodId,token);
       
    };

    const decreaseQty = async (foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] > 0 ? prev[foodId] - 1 : 0) }));
       await removeQtyFromCart(foodId,token);
    };

    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });
    };

    const loadCart = async () => {
        console.log("loadCart: Fetching cart data...");
        const items = await getCartData(token);
        console.log("loadCart: Setting quantities to", JSON.stringify(items));
        setQuantities(items);
    };

    useEffect(() => {
        async function fetchInitialFoodList() {
            const data = await fetchFoodList();
            setFoodList(data);
        }
        fetchInitialFoodList();
    }, []);

    useEffect(() => {
        console.log("Authentication useEffect: token changed to", token);
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Authentication useEffect: Calling loadCart()");
            loadCart();
        } else {
            // Clear quantities if token is removed (logout)
            setQuantities({});
        }
    }, [token]);

    useEffect(() => {
        console.log("localStorage useEffect: quantities changed", quantities);
        localStorage.setItem("cartQuantities", JSON.stringify(quantities));
    }, [quantities]);

    const contextValue = {
        foodList,
        increaseQty,
        quantities,
        decreaseQty,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};