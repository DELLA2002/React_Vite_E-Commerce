import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './CategorySlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
export default function CategorySlider() {
    let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay:true
    };
    const [categories, setCategories] = useState([]);
    function getCategories(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({data})=>{
            setCategories(data.data);
            
        })
        .catch((error)=>{

        });
    }
    useEffect(()=>{
        getCategories();
    },[]);
    return <>
    <div className='hidden lg:block'>
        <h2 className='py-5 text-2xl font-normal'>Shop Popular Items</h2>
        <Slider {...settings}>
            {categories?.map((category)=><div>
            <img className='w-full h-55' src={category.image} alt={category.name} />
            <h3 className='font-semibold'>{category.name}</h3>
            </div>
        )}
        </Slider>
    </div>
</>
}
