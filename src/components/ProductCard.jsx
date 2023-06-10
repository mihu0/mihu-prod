import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import { HeartIcon,ShoppingCartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/Cart';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { manageFavorite } from '../features/User';
import axios from 'axios';


function ProductCard({product}) {
    const dispatch =  useDispatch();
    const {isUserLoggedIn,favorites,user} = useSelector(state=>state.user)
    const [isFavorite,setIsfavorite] = useState(false);
    const [isAdded,setIsAdded] = useState(false);


    useEffect(()=>{
        if (favorites.length!==0) {
            if (favorites.indexOf(product._id)!==-1) {
                setIsfavorite(true)
            }
        }
    },[])
    const handleAddToCart =()=>{
        if (!isAdded) {
            dispatch(addToCart({item:{...product,count:1}}))
            setIsAdded(true);
            setTimeout(()=>{
                setIsAdded(false);
            },2500);
        }

    }

    const handleFavorite = async ()=>{
        if(!isUserLoggedIn){
            toast("Please Login First!!")
        }
        else{
            let newFavs = []
            if (isFavorite) {
                newFavs = favorites.filter(fav=>{
                    return fav!==product._id;
                    
                })
            }
            else{
                newFavs = [...favorites]
                newFavs.push(product._id)
            }
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:`Bearer ${user}`
                }
              }

            axios.post(`${process.env.REACT_APP_API_URL}manageFavorite`,{favorites:newFavs},config).then(val=>{
                console.log("VAL  ",val)
                if (val.data.success) {
                    setIsfavorite(!isFavorite)

                    localStorage.setItem("favorites",JSON.stringify(newFavs))
                    dispatch(manageFavorite(newFavs))
                }
                else{
                  toast("Favorite not Added");
                }
              }).catch((error=>{
                console.log(error)
                  toast("Favorite not Added");
              }))
        }
    }

    return (

        <motion.div whileHover={{scale:1.02}} className=" w-full max-w-[11rem] md:max-w-[14rem] bg-white/95 rounded-lg shadow-lg">
            <Link to={`/product/${product._id}`}>
                <motion.img whileHover={{scale:0.95}}  className="p-3 w-full h-30 md:h-52 rounded-t-lg" src={product.imageLinks[0]} alt={product.name} />
            </Link>
            <div className="px-5 pb-5">
                <Link to={`/product/${product._id}`}>
                    <motion.h5 whileHover={{scale:0.95}} className="text-base whitespace-nowrap text-ellipsis overflow-hidden md:text-xl font-semibold tracking-tight text-gray-900">{product.name}</motion.h5>
                </Link>
                <Link to={`/category/${product.category}`}>
                    <motion.p whileHover={{scale:0.98}} className="text-xs hover:text-teal-600">{product.category}</motion.p>
                </Link>
                <Stars rating={product.stars}/>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <span className="text-lg md:text-lg font-bold text-gray-900">Rs.{product.price}</span>
                    <div className="flex gap-3 self-end md:self-auto">
                        <motion.div whileTap={{scale:0.8}} whileHover={{scale:1.1}} onClick={handleFavorite}>
                            <HeartIcon className={`h-7 w-7 text-red-500 hover:text-red-700 ${isFavorite?"fill-red-500":""}`}/>
                        </motion.div>
                        <motion.div whileTap={{scale:0.8}} whileHover={{scale:1.1}} onClick={handleAddToCart}>
                            {isAdded?<CheckCircleIcon className="h-7 w-7 text-green-700 fill-green-400"/> :<ShoppingCartIcon className="h-7 w-7 text-green-700 hover:fill-green-400" />}
                            
                        </motion.div>
                    </div>
                    {/* <a href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a> */}
                </div>
            </div>
        </motion.div>

    );
}

export default ProductCard;
