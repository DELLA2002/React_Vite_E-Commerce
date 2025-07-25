import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Footer.module.css';
import logo from '../../assets/logo.png'
export default function Footer() {
    const [Count, setCount] = useState(0);
    useEffect(()=>{
        
    },[]);
    return <>
        

<footer className="bg-sky-900 rounded-lg text-white shadow-sm dark:bg-gray-900 relative bottom-0 right-0 left-0 mx-4 mb-4">
    <div className="w-full max-w-screen-xl mx-auto p-1">
        <div className="sm:flex sm:items-center sm:justify-between">
            {/* <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a> */}
                <img src={logo} width={100} alt="" />
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>


    </>
}
