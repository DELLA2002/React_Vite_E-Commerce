import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Style from './Login.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserContext } from '../../Context/userContext';
export default function Login() {
    let {userToken , setUserToken} = useContext(UserContext);
    const [apiError, setapiError] = useState('');
    const [isLoading, setisLoading] = useState(false);
    let validationSchema = Yup.object().shape({
        email:Yup.string().email("email is not valid").required('email is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{7,12}$/ , "password must start with uppercase letter and contain 8 to 12 letter").required('phone is required'),
    })

    let navigate = useNavigate();
    function handleLogin(formValues){
        setisLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValues)
        .then(
            (apiResponse)=>{
                if(apiResponse?.data?.message === "success"){
                    localStorage.setItem('userToken' , apiResponse.data.token);
                    setUserToken(apiResponse.data.token);
                    // console.log(apiResponse);
                    navigate('/');
                    setisLoading(false);
                }
            }
        )
        .catch(
            (apiResponse)=>{
                setisLoading(false)
                setapiError(apiResponse?.response?.data?.message);
            }
        );
        
    }

    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit:handleLogin
    })

    return <>
        <div className='max-w-lg mx-auto py-6 z-5'>
            {apiError ? <p className='bg-red-200 p-2 rounded-md my-2 text-red-500'>{apiError}</p> : null}
            <h2 className='mb-6 text-3xl font-bold text-orange-600'>Login Now</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" "  />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                    {formik.errors.email && formik.touched.email ? <p className='bg-red-200 p-2 rounded-md my-2 text-red-500'>{formik.errors.email}</p> : null}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" "  />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {formik.errors.password && formik.touched.password ? <p className='bg-red-200 p-2 rounded-md my-2 text-red-500'>{formik.errors.password}</p> : null}
                </div>
                <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-1/4 sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                {isLoading?<i className='fa-spin fa-spinner fas'></i>:"Login"}
                </button>
                <span className='pl-4'>If you don't have an Account <span className='font-semibold'> <Link to={'/register'}>Register Now</Link> </span></span>
            </form>
        </div>
    </>
}
