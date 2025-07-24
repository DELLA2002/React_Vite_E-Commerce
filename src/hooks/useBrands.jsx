import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
export default function useBrands(){
    function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let responseBrands = useQuery(
        {
        queryKey: ['Brands'],
        queryFn:getBrands,
        select:(data)=>data.data
        }
    );
    return responseBrands;
}