import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){
    let headers = {
        token:localStorage.getItem('userToken')
    }
    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function updateCartItem(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            count
        } ,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers
        }).then((response)=>response)
        .catch((response)=>response)
    }
    function clearCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        }).then((response)=>response)
        .catch((response)=>response)
    }
    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
            {
                productId
            } , {
                headers
            }
        ).then((response)=>response)
        .catch((error)=>error)
    }

    return <CartContext.Provider value={{addToCart , getCartItems , removeCartItem , updateCartItem , clearCart}}>
        {props.children}
    </CartContext.Provider>

}