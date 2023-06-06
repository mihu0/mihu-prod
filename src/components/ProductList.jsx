import React from 'react'
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';


function ProductList({name,data}) {
    return (
        <div className="flex flex-col gap-5">
            <motion.h1 whileHover={{scale:1.05}} initial={{y:-50,opacity:0,scale:0.6}} animate={{y:0,opacity:1,scale:1}} transition={{type:"spring", duration:1.5}} className="text-center text-xl md:text-2xl font-bold">{name}</motion.h1>
            <div className="grid md:grid-rows-1 grid-rows-3 grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 w-full items-center justify-center px-5 md:px-20">
                {data.map((item,i)=>{
                    return <motion.div initial={{opacity:0, x:50,scale:0.5}} transition={{type:"spring", delay:i*0.4,bounce:0.4,stiffness:60,mass:1.5}} whileInView={{ opacity: 1,x:0,scale:1}} viewport={{ once: true }} key={`${item._id}`} className={`${i===4?'col-span-2 md:col-span-1':''} flex justify-center items-center`}>
                    <ProductCard product = {item} />
                    </motion.div>
                })}

            </div>
        </div>
    )
}

export default ProductList