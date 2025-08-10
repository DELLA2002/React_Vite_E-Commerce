import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Wishlist.module.css';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
export default function Wishlist() {
    let {getWishlist , removeWishlistItem} = useContext(WishlistContext);
        let {addToCart} = useContext(CartContext);
    const [wishlistDetails, setWishlistDetails] = useState(null);
    const [isRemoving, setIsRemoving] = useState(false);
        const [isAdding, setIsAdding] = useState(false);
    async function getWishlistProducts(){
        let response = await getWishlist();
        // console.log(response.data);
        setWishlistDetails(response.data);
    }
    async function removeItem(productId) {
        setIsRemoving(true);
        let response = await removeWishlistItem(productId);
        setWishlistDetails(response.data);
        setIsRemoving(false);
    }
    async function addProductToCart(productId){
        setIsAdding(true);
        let response = await addToCart(productId);
        if(response.data.status === "success"){
            setIsAdding(false);
            toast.success(`${response.data.message}` , {
                duration:3000,
                position:"top-right",
                style:{
                    backgroundColor:"green",
                    color:"white"
                }
            })
        }else{
            toast.error(`${response.data.message}` , {
                duration:3000,
                position:"top-right"
            })
        }
        // console.log(response);
        
    }   
    useEffect(()=>{
        getWishlistProducts();
    },[]);
    return <div className='flex items-center flex-col mt-20'>
            {wishlistDetails?.data.length === 0 ? <div className='py-50 text-center'>
                <h2 className='text-4xl font-extrabold'>No items in Your wishlist</h2>
            </div> : null}
            {wishlistDetails !== null ? wishlistDetails?.data.map((product)=><div key={product._id} className="relative overflow-x-auto shadow-md w-full sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                Product
                </th>
                <th scope="col" className="px-6 py-3">
                Add
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.title}
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                    <div>
                        <button onClick={()=>addProductToCart(product._id)} className='btn'>
                            {isAdding?<i className='fa-spin fa-spinner fas'></i>:"Add to Cart"}
                        </button>
                    </div>
                </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price} EGP
                </td>
                <td className="px-6 py-4">
                <span onClick={()=>removeItem(product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
                    {isRemoving?<i className='fa-spin fa-spinner fas'></i>:"Remove"}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        <hr></hr>
        
        </div>) : <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-600 flex z-100 justify-center items-center'>
                <span className="loader"></span>
            </div>}
    </div>
}
