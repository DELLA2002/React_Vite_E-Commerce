import axios from 'axios';
import React, { createContext } from 'react'


export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    let headers = {
        token:localStorage.getItem('userToken')
    }
    function getWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
            {
                productId
            } , {
                headers
            }
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function removeWishlistItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers
        }).then((response)=>response)
        .catch((response)=>response)
    }
    return <WishlistContext.Provider value={{getWishlist , addToWishlist , removeWishlistItem}}>
        {props.children}
    </WishlistContext.Provider>
}
