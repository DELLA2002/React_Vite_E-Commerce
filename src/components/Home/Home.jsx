import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Home.module.css';
import axios from 'axios';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
export default function Home() {
    useEffect(()=>{
        
    },[]);
    return <>
        <CategorySlider/>
        <RecentProducts/>
    </>
}
