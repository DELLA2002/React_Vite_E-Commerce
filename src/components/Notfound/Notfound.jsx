import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Notfound.module.css';
export default function Notfound() {
    const [Count, setCount] = useState(0);
    useEffect(()=>{
        
    },[]);
    return <>
        <h1>Notfound</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae inventore obcaecati, quo id mollitia beatae itaque vero perferendis animi totam assumenda perspiciatis. Nesciunt incidunt delectus aliquam pariatur quidem vel eaque.</p>
    </>
}
