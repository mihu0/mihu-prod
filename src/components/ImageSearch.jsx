import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';
import { setImageSearch } from '../features/Modals';

const variants = {
    initial: { opacity: 0, scaleY: 0 },
    animate: { opacity: 1, scaleY: 1 }
}

function ImageSearch() {
    const dispatch = useDispatch();
    const { imageSearch } = useSelector((state) => state.modals);
    const [selectedImage, setSelectedImage] = useState(null);



    return (
        // modal screen
        <div className={`${imageSearch ? "block" : "hidden"} bg-black/40 fixed z-[99999] w-full h-full left-0 top-0 overflow-auto scrollbar`}>
            {/* <div className='hidden md:block md:w-[70%] md:fixed md:top-0 md:bottom-0 md:left-0' onClick={()=>dispatch(setIsCartOpen({}))}></div> */}
            {/* Cart Sidebar  */}
            <motion.div initial={{ opacity: 0, scaleX: 0, x: 150 }} transition={{ type: "spring", duration: 0.8, bounce: 0.4 }} whileInView={{ opacity: 1, scaleX: 1, x: 0 }} viewport={{ once: false }} className="fixed right-0 top-0 w-full md:w-[max(400px,30%)] h-full bg-white">
                {/* Header */}
                <div className="p-7 overflow-auto h-full">
                    {/* Heading and close button */}
                    <div className="flex justify-between items-center mb-4">
                        <motion.h3 whileHover={{ scale: 1.1 }} className="text-2xl font-semibold text-teal-600">Image Search </motion.h3>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => dispatch(setImageSearch(false))}>
                            <XMarkIcon className="h-9 w-9 text-red-500 hover:text-red-400" />

                        </motion.div>




                </div>
                        <div>

                            {selectedImage && (
                                <div>
                                    <img
                                        alt="not found"
                                        width={"250px"}
                                        src={URL.createObjectURL(selectedImage)}
                                    />
                                    <br />
                                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                                </div>
                            )}

                            <br />
                            <br />

                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                    console.log(event.target.files[0]);
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </div>
                    </div>

            </motion.div>


        </div>
    )
}

export default ImageSearch