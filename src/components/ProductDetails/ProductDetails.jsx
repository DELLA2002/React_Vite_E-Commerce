import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './ProductDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductDetails() {
    let {addToCart} = useContext(CartContext);
    let {addToWishlist}  = useContext(WishlistContext);
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
    }
    async function addProductToWishlist(productId){
            let response = await addToWishlist(productId);
            console.log(response);
            if(response.data.status === "success"){
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
        }
    let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
    };
    let settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay:true,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
            }
        },
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
            }
        },
    ]
    };
    let {id , category} = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    function getProductDetails(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
            setProductDetails(data.data);
            console.log(data.data);
            
        })
        .catch((error)=>{

        });
    }
    function getRelatedProducts(category){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>{
            let allProducts = data.data;
            let related  = allProducts.filter((product)=> product.category.name === category);
            setRelatedProducts(related);
        })
        .catch((error)=>{

        });
    }
    useEffect(()=>{
        getProductDetails(id);
        getRelatedProducts(category);
    },[id , category]);
    return <>
    {productDetails !== null ?<> <div className="row">
            <div className="w-full md:w-1/4 mb-2 mt-15 px-6">
    
                <Slider {...settings}>
                    {productDetails?.images?.map((src)=><img className='w-full ' src={src} />)}
                </Slider>
            </div>
            <div className="w-full md:w-3/4 px-6">
                <h1 className='font-normal'>{productDetails?.title}</h1>
                <p>{productDetails?.description}</p>
                <div className="flex justify-between py-4">
                                <p className='font-semibold text-xl'>{productDetails?.price} EGP</p>
                                <p className='font-semibold text-xl'>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></p>
                                <button onClick={()=>addProductToWishlist(productDetails?.id)}> <i onClick={(e)=>{e.currentTarget.classList.add("text-red-600")}} className='fas inline-block fa-heart text-2xl hover:cursor-pointer hover:text-red-600 duration-200'></i></button>
                        
                            </div>
                            <button onClick={()=>addProductToCart(productDetails?.id)} className='btn'>
                            {isAdding?<i className='fa-spin fa-spinner fas'></i>:"Add to Cart"}
                        </button>
                        
            </div>
                <h2 className='text-3xl font-semibold mx-auto my-4'>Related Products</h2>
            
            
        </div> 
                <Slider {...settings2}>            
                {relatedProducts.map((product)=>
                    <div key={product.id} className="w-full px-2 py-4 overflow-hidden">
                        <div className="product hover:shadow-green-800 bg-lime-50 duration-500 shadow-lg px-2 py-4 rounded-2xl">
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img className='w-full rounded-2xl' src={product.imageCover} alt={product.title} />
                            <p className='text-green-500 '>{product.category.name}</p>
                            <h2 className='text-slate-800 font-bold text-2xl py-2'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
                            <div className="flex justify-between">
                                <p>{product.price} EGP</p>
                                <p>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></p>
                            </div>
                            <button onClick={()=>addProductToWishlist(productDetails?.id)}> <i onClick={(e)=>{e.currentTarget.classList.add("text-red-600")}} className='fas inline-block fa-heart text-2xl hover:cursor-pointer hover:text-red-600 duration-200'></i></button>
                        
                            <button onClick={()=>addProductToCart(product.id)} className='btn'>
                            {isAdding?<i className='fa-spin fa-spinner fas'></i>:"Add to Cart"}
                        </button>
                    </Link>
                        </div>
                </div>
                
            )}
            
            </Slider>
            </>   : <div className='absolute top-0 left-0 right-0 bottom-0 z-100 bg-gray-600 flex justify-center items-center'>
                <span className="loader"></span>
            </div>}
        
    </>
}
