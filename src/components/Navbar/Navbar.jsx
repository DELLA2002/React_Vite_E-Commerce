import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { UserContext } from '../../Context/userContext';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';

export default function Navbar() {
    let {getCartItems} = useContext(CartContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    function updateNumOfItems(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers : {
        token:localStorage.getItem('userToken')
    }
        }).then((response)=>setNumOfCartItems(response.data.numOfCartItems))
        .catch((error)=>error)
    }
    async function getNumOfItems(){
        let response = await getCartItems();
        // console.log(response.data);
        if(numOfCartItems !== response.data.numOfCartItems){
            setNumOfCartItems(response.data.numOfCartItems);
        }
    }
    let navigate = useNavigate();
    let {userToken , setUserToken} = useContext(UserContext);
    function logOut(){
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/login');
    }
    useEffect(()=>{
        getNumOfItems();
    } , [updateNumOfItems]);
    return <>
    <nav className='fixed top-0 left-0 right-0 z-10'>
        <div className=" flex bg-gray-200 justify-between mx-auto">
            <div className='flex items-center'>
                {/* <h2 className='text-2xl px-2'>logo</h2> */}
                <img src={logo} className='mx-8' width={100} alt="collect shopping logo" />
                <ul className='md:max-2xl:flex md:max-2xl:justify-around md:max-2xl:w-100  mx-4'>
                    {userToken !== null ? <>
                        <li><NavLink  className='text-slate-900 nav-item text-lg font-light' to=''>Home</NavLink></li>
                    <li><NavLink className='text-slate-900 text-lg nav-item font-light' to='cart'>Cart</NavLink></li>
                    <li><NavLink className='text-slate-900 text-lg nav-item font-light' to='products'>Products</NavLink></li>
                    <li><NavLink className='text-slate-900 text-lg nav-item font-light' to='categories'>Categories</NavLink></li>
                    <li><NavLink className='text-slate-900 text-lg nav-item font-light' to='brands'>Brands</NavLink></li>
                
                    </> : null }
                    </ul>
            </div>
            <div className='flex items-center'>
                <ul className='lg:flex lg:justify-around lg:w-100 lg:mx-8 items-center'>
                    <li className='invisible lg:visible'>
                        <a href='https://www.facebook.com/mohamed.ahmedabdellah' target='_blank'><i className='fab mx-2 text-2xl fa-facebook hover:text-blue-500 duration-200'></i></a>
                        <a href="https://www.instagram.com/mohamed3abdellaa/" target='_blank'><i className='fab mx-2 text-2xl fa-instagram hover:text-purple-500 duration-200'></i></a>
                        <a href="https://github.com/DELLA2002" target='_blank'><i className='fab mx-2 text-2xl fa-github'></i></a>
                        <a href="https://www.linkedin.com/in/mohamed-abdellah-50a1b5241/" target='_blank'><i className='fab mx-2 text-2xl fa-linkedin hover:text-blue-900 duration-200'></i></a>
                        <a href="https://www.youtube.com/channel/UCqwVXH6jZSZOlyblW_bHZ3g" target='_blank'><i className='fab mx-2 text-2xl fa-youtube hover:text-red-500 duration-200'></i></a>
                    </li>
                    {
                        userToken === null ? <>
                            <li className='inline-block mx-4'><NavLink className='text-slate-900 text-lg nav-item font-light' to='login'>Login</NavLink></li>
                            <li className='inline-block mx-4'><NavLink className='text-slate-900 text-lg nav-item font-light '  to='register'>Register</NavLink></li>
                        </> : <div className='flex justify-between w-1/4 items-center'><Link to={'cart'}><i className="fa-solid fa-cart-shopping text-2xl pr-10 text-blue-950 relative"><span className='absolute bottom-1 left-1 ml-4 mb-1 bg-orange-400 p-2 text-sm font-extralight rounded-full text-white'>{numOfCartItems}</span></i> </Link><li onClick={logOut}><span className='text-slate-900 text-lg nav-item font-light cursor-pointer'>Logout</span></li></div> 
                    }
                    </ul>
            </div>
        </div>
    </nav>
    </>
}
