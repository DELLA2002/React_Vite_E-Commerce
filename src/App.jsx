import { useContext, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserContextProvider from './Context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider, { WishlistContext } from './Context/WishlistContext';


let Routing = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'productdetails/:id/:category' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'*' , element:<Notfound/>},
  ]}
])
function App() {
  let query = new QueryClient();
  return <WishlistContextProvider>
  <CartContextProvider>
<QueryClientProvider client={query}>
      <UserContextProvider>

      <RouterProvider router={Routing}></RouterProvider>
      <Toaster/>
      <ReactQueryDevtools/>
      </UserContextProvider>
  </QueryClientProvider>
  </CartContextProvider>
  </WishlistContextProvider>
}

export default App
