import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import {  useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { closeAll } from '../features/Modals'

function ProductsListPage() {
  const { category, searchQuery,brand } = useParams()
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(closeAll())
  },[])
  useEffect(() => {
    setProducts([])
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    }
    if (category !== undefined) {
      axios.post(`${process.env.REACT_APP_API_URL}productsCategoryWise`, { category: category }, config).then(res => {
        if(res.data.products){
          
          if (res.data.products.length===0) {
            setProducts(null)
          }
          else{

            setProducts(res.data.products)
          }
        }else{
          toast("Please Try again Later.")

        }
      }).catch(err=>{
        toast("Please Try again Later.")
      })
    }
    else if (brand!==undefined){
      axios.post(`${process.env.REACT_APP_API_URL}productsBrandWise`, { brand: brand }, config).then(res => {
        if(res.data.products){
          
          if (res.data.products.length===0) {
            setProducts(null)
          }
          else{

            setProducts(res.data.products)
          }
        }else{
          toast("Please Try again Later.")

        }
      }).catch(err=>{
        toast("Please Try again Later.")
      })
    }
    else if (searchQuery!==undefined){
      axios.post(`${process.env.REACT_APP_API_URL}searchProducts`, { search: searchQuery }, config).then(res => {
        if(res.data.products){
          if (res.data.products.length===0) {
            setProducts(null)
          }
          else{

            setProducts(res.data.products)
          }
        }else{
          toast("Please Try again Later.")

        }
      }).catch(err=>{
        toast("Please Try again Later.")
      })
    }
  }, [brand,category,searchQuery])

  if(products===null){
    return <div className='h-screen w-full flex justify-center items-center'>
      <h1 className='text-3xl text-center font-semibold'>No Products Match this Criteria</h1>
    </div>
  }

  if (products.length === 0) {
    return <div className='w-[90vw] h-[70vh] flex justify-center items-center'>
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }
  
  return (
    <div className="py-6 px-3 md:px-0">
      <div className="flex w-full gap-5 flex-col md:flex-row">
        <div className="flex-[0.15] flex flex-col items-center">
          <button className="bg-black/70 text-white p-2 rounded-lg w-[80%] hover:bg-black ">Apply Filters {">"}</button>
        </div>
        <div className="flex-[0.8] flex flex-col gap-5 items-center md:items-start">
          <div className="w-[95%] md:w-full h-48 md:h-56 relative">
            <img src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="chairs" className="w-full h-full object-cover rounded-md" />
            <p className="text-3xl md:text-5xl bg-black/30 rounded p-2 text-white font-semibold absolute top-5 left-5">{category?category:searchQuery?searchQuery:brand}</p>
          </div>
          <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-3 md:px-0">
            {products.map((prod) => (
              <ProductCard key={prod.name} product={prod} />
            ))}
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductsListPage