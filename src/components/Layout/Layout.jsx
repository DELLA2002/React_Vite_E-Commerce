import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
    const [Count, setCount] = useState(0);
    useEffect(()=>{
        
    },[]);
    return <>
        <Navbar/>
        <div className='container py-10 mt-10'>
            <Outlet></Outlet>
        </div>
        <Footer/>
    </>
}
