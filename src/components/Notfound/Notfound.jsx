import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Notfound.module.css';
import logo from '../../assets/notfound.jpg'
export default function Notfound() {
    return <>
        <div className="text-center">
            <h1 className='pt-30 pb-4 text-3xl font-bold'>Page Not Found</h1>
            <img src={logo} width={400} className='mx-auto' alt="" />
        </div> 
    </>
}
