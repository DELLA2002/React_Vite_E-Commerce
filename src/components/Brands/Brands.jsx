import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useBrands from '../../hooks/useBrands';
export default function Categories() {
    let {data , isLoading , error , isError , isFetching} = useBrands();
        if(isLoading){
            return <div className='absolute top-0 left-0 z-100 bottom-0 right-0  flex justify-center items-center'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-600 flex justify-center items-center'>
                    <span className="loader"></span>
                </div>
            </div>
        }

    return <>
        <h1 className='text-center text-4xl text-green-600 font-bold mt-15'>All Brands</h1>
    <div className="row">
        {data?.data.map((brand)=>
            <div key={brand._id} className="w-full md:w-1/2 lg:w-1/4  px-2 py-4">
                
                    <div className="hover:shadow-green-800 relative border-2 h-70 text-center overflow-hidden border-green-200 duration-500 shadow-lg px-2 py-4 rounded-2xl">
                        <img src={brand.image} className='w-full' />
                        <h2 className='text-center text-3xl absolute w-full p-5 bottom-0 bg-white text-green-700'>{brand.name}</h2>
                    </div>
                </div>
            
        )}
    </div>
    </>
}
