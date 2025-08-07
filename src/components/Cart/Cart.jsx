import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
export default function Cart() {
    let {getCartItems , removeCartItem , updateCartItem , clearCart} = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const [isClearing, setIsClearing] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    async function getProducts(){
        let response = await getCartItems();
        // console.log(response.data);
        setCartDetails(response.data);
    }
    async function updateQuantity(productId , count) {
        if(count < 1){
            removeItem(productId);
        }
        setIsUpdating(true);
        let response = await updateCartItem(productId , count);
        setCartDetails(response.data);
        setIsUpdating(false);
    }
    async function removeItem(productId) {
        setIsRemoving(true);
        let response = await removeCartItem(productId);
        setCartDetails(response.data);
        setIsRemoving(false);
    }
    async function clearItems() {
        setIsClearing(true);
        let response = await clearCart();
        // console.log(response);
        getProducts();
        setIsClearing(false);
        // setCartDetails(null);
    }
    useEffect(()=>{
        getProducts();
    },[]);
    return <div className='flex items-center flex-col mt-20'>
            {cartDetails?.data.products.length === 0 ? <div className='py-50 text-center'>
                <h2 className='text-4xl font-extrabold'>No items in Your cart</h2>
            </div> : null}
            {cartDetails !== null ? cartDetails?.data.products.map((product)=><div key={product.product.id} className="relative overflow-x-auto shadow-md w-full sm:rounded-lg">
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
                Qty
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
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title.split(' ').slice(0,2).join(' ')}
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                    <button onClick={()=>updateQuantity(product.product.id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                    </button>
                    <div>
                        {isUpdating?<i className='fa-spin fa-spinner fas'></i>:`${product.count}`}
                        
                    </div>
                    <button onClick={()=>updateQuantity(product.product.id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                    </button>
                </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {isUpdating?<i className='fa-spin fa-spinner fas'></i>:product.price*product.count} EGP
                </td>
                <td className="px-6 py-4">
                <span onClick={()=>removeItem(product.product.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
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
            <button onClick={()=>clearItems()} className='px-4 py-2 hover:cursor-pointer hover:bg-red-950 transition-all duration-300 rounded-lg text-white w-1/2 lg:w-1/4 my-5 text-2xl bg-red-500'>
                {isClearing?<i className='fa-spin fa-spinner fas'></i>:"Clear your cart"}
            </button>
    </div>
}
