import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Notfound.module.css';
import logo from '../../assets/notfound.jpg'
import cart from '../../assets/logo.png'
export default function Notfound() {
    return <>
        <div className="text-center">
            <h1 className='pt-10 text-3xl font-bold'>Welcome to Our WebSite</h1>
            <img src={cart} width={400} className='mx-auto' alt="" />
            {/* <img src={logo} width={800} className='mx-auto' alt="" /> */}
        </div> 
    </>
}
