import React, { useEffect, useState } from 'react'
import BrandTiles from '../components/BrandTiles';
import CategoryTiles from '../components/CategoryTiles';
import ProductList from '../components/ProductList';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import Slider from "../components/Slider";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeAll } from '../features/Modals';





function Home() {
  const [products,setProducts] = useState(null);
  const [trending,setTrending] = useState(null);
  const [featured,setFeatured] = useState(null);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeAll())
  },[])
 
  useEffect(()=>{
    
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }
    axios.get(`${process.env.REACT_APP_API_URL}random`, config).then(res => {
      console.log(res,"GETTINF RANDOM")
        if(res.data.products){
          
          setProducts(res.data.products)
        }else{
          toast("Please Try again Later.")

        }
      }).catch(err=>{
        toast("Please Try again Later.")
      })
  },[])

  useEffect(()=>{
    if (products) {
      setTrending(products.slice(0,5));
      setFeatured(products.slice(5));
    }
  },[products])

  return (
    <div >
      <Slider/>
      <Services/>
      {trending && <ProductList name={"Trending Products"} data={trending}/>}
      <CategoryTiles/>
      {featured && <ProductList name={"Featured Products"} data={featured}/>}
      <BrandTiles/>
      <Newsletter/>
    </div>
  )
}

export default Home