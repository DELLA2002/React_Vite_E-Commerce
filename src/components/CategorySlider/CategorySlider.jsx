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
    <div className='lg:block'>
        <h2 className='py-5 mt-20 text-2xl font-normal'>Shop Popular Items</h2>
        <Slider {...settings}>
            {categories?.map((category)=><div>
            <img className='w-full h-100 lg:h-55' src={category.image} alt={category.name} />
            <h3 className='font-semibold text-center'>{category.name}</h3>
            </div>
        )}
        </Slider>
    </div>
</>
}
