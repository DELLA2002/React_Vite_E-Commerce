import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import { CircleLoader, DotLoader } from 'react-spinners';
import useProducts from '../../hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {
    let {addToCart} = useContext(CartContext);
    const [isAdding, setIsAdding] = useState(false);
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

    let {data , isLoading , error , isError , isFetching} = useProducts();
    if(isLoading){
        return <div className='absolute top-0 left-0 z-100 bottom-0 right-0  flex justify-center items-center'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-600 flex justify-center items-center'>
                <span className="loader"></span>
            </div>
        </div>
    }
    return <>
        <div className="row">
    
            {data.map((product)=>
            <div key={product.id} className="w-1/4 px-2 py-4 overflow-hidden">
                        <div className="product hover:shadow-green-800 bg-lime-50 duration-500 shadow-lg px-2 py-4 rounded-2xl">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img className='w-full rounded-2xl' src={product.imageCover} alt={product.title} />
                            <p className='text-green-500 '>{product.category.name}</p>
                            <h2 className='text-slate-800 font-bold text-2xl py-2'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
                            <div className="flex justify-between">
                                <p>{product.price} EGP</p>
                                <p>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></p>
                            </div>
            </Link>
                        <button onClick={()=>addProductToCart(product.id)} className='btn'>
                            {isAdding?<i className='fa-spin fa-spinner fas'></i>:"Add to Cart"}
                        </button>
                        </div>
                </div>
                
            )}
        </div>
    </>
}
