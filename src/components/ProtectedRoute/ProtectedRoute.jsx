import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(props) {
    
    if(localStorage.getItem('userToken') !== null){
        return props.children;
    }
    else{
        return <Navigate to={'/login'}/>
    }
    return <>
        <h1>ProtectedRoute</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae inventore obcaecati, quo id mollitia beatae itaque vero perferendis animi totam assumenda perspiciatis. Nesciunt incidunt delectus aliquam pariatur quidem vel eaque.</p>
    </>
}
