import { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/User';
import { setIsCartOpen } from '../features/Cart';
import Search from './Search';
import axios from 'axios';
import { toast } from 'react-toastify';


function Navbar() {
    const dispatch = useDispatch();
    const [searchState, setSearchState] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const [brandModal, setBrandsModal] = useState(false);
    const [categoryModal, setCategotyModal] = useState(false);
    const [brandsPostion, setBrandsPostion] = useState(0);
    const [categoryPostion, setCategoryPostion] = useState(0);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);



    const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const brandRef = useRef();
    const categoryRef = useRef();
    const [windowDimension, setWindowDimension] = useState(null);

    useEffect(() => {
        setWindowDimension(window.innerWidth);
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowDimension <= 640;



    useEffect(() => {

        const getCategories = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            console.log("here")
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}getCategories`, config)
                if (data.success) {
                    setCategories(data.categories)
                }
                else {
                    toast("Server Error Please Try again later!")

                }

            } catch (error) {
                toast("Server Error Please Try again later!")
                console.log(error)
            }
        }
        const getBrands = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            console.log("here")
            try {
                console.log(process.env.REACT_APP_API_URL)
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}getBrands`, config)
                if (data.success) {
                    console.log(data)
                    setBrands(data.brands)
                }
                else {
                    toast("Server Error Please Try again later!")

                }

            } catch (error) {
                toast("Server Error Please Try again later!")
                console.log(error)
            }
        }
        getCategories()
        getBrands()

        if (!isMobile) {

            document.addEventListener("click", () => {
                setBrandsModal(false)
                setCategotyModal(false)
            });
        }
    }, [])


    useEffect(() => {

        const currBrands = brandRef.current;
        if (currBrands) {

            const brandsRect = currBrands.getBoundingClientRect();
            console.log(brandsRect)
            setBrandsPostion(brandsRect.left);
        }

    }, [brandRef])


    useEffect(() => {

        const currCat = categoryRef.current;
        if (currCat) {

            const catRect = currCat.getBoundingClientRect();
            console.log(catRect)
            setCategoryPostion(catRect.left);
        }

    }, [categoryRef])



    useEffect(() => {
        if (!isUserLoggedIn) {
            const token = localStorage.getItem('auth-token');
            if (token !== null && token !== undefined) {
                dispatch(login(token))
            }
        }
    }, [isUserLoggedIn, dispatch])

    return (
        <>

            <motion.nav initial={{ y: -250 }} animate={{ y: 0 }} transition={{ type: "spring" }} className="shadow-sm px-6 py-4 md:px-8  flex items-center justify-between font-sans relative">
                <Link to="/"><span className="font-bold text-2xl md:text-4xl hover:text-teal-600"> MIHU.</span></Link>


                <motion.div className={`pt-7 md:pt-0 pb-7 absolute z-50 bg-white shadow ${(menuState && !isCartOpen) ? "" : "translate-y-[-200%]"} min-h-[40%] right-0 top-20 w-full md:translate-y-0 md:shadow-none md:z-0 md:flex md:bg-transparent md:pb-0 md:static md:min-h-fit md:w-auto transition-all duration-300 ease-in`}>
                    <ul className="flex flex-col gap-12 md:flex-row items-center md:flex md:gap-6 text-lg font-medium">
                        <motion.li whileHover={{ scale: 1.1 }} className="hover:text-sky-600"><a href="/#">About Us</a></motion.li>
                        <motion.li ref={brandRef} id="brands" onHoverStart={() => { setBrandsModal(true); setCategotyModal(false) }} onTap={() => { setBrandsModal(!brandModal); setCategotyModal(false)}} whileHover={{ scale: 1.1 }} className="hover:text-sky-600 cursor-pointer">
                            Brands
                            {isMobile && brandModal && <motion.div initial={{ y: -20, scaleX: 0.4, opacity: 0.7 }} animate={{ scaleX: 1, y: 0, opacity: 1 }} transition={{ type: "spring" }} id="brandsHover" style={{ left: brandsPostion }} className={`z-[9999] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 w-min-44`}>
                                <ul className="py-2 text-sm text-gray-700 grid-rows-5 grid-flow-col" aria-labelledby="dropdownHoverButton">
                                    {brands.map((brand, i) => (
                                        <li key={i}>
                                            <Link to={`brands/${brand}`} className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg hover:text-sky-600">{brand}</Link>
                                        </li>

                                    ))}

                                </ul>
                            </motion.div>}
                        </motion.li>
                        <motion.li ref={categoryRef} id="category" onHoverStart={() => { setCategotyModal(true); setBrandsModal(false) }} onTap={() => { setCategotyModal(!categoryModal); setBrandsModal(false) }} whileHover={{ scale: 1.1 }} className="hover:text-sky-600 cursor-pointer">
                            Category
                            {categoryModal && isMobile && <motion.div initial={{ y: -20, scaleX: 0.4, opacity: 0.7 }} animate={{ scaleX: 1, y: 0, opacity: 1 }} transition={{ type: "spring" }} id="categoryHover" style={{ left: categoryPostion }} className={`z-[9999] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-min-44`}>
                                <ul className="py-2 text-sm text-gray-700 grid grid-rows-5 grid-flow-col" aria-labelledby="dropdownHoverButton">
                                    {categories.map((cat, i) => (
                                        <li key={i}>
                                            <Link to={`category/${cat}`} className="block px-4 py-2 hover:bg-gray-100 hover:text-sky-600">{cat}</Link>
                                        </li>

                                    ))}

                                </ul>
                            </motion.div>}
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1 }} className="hover:text-sky-600"><a href="/#">Contact Us</a></motion.li>


                    </ul>

                </motion.div>

                <div className="flex gap-4">
                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => { menuState && setMenuState(false); setSearchState(!searchState); }}>
                        <MagnifyingGlassIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.8 }} onClick={() => dispatch(setIsCartOpen({}))}>
                        <div className="relative">
                            <ShoppingCartIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                            <span className="inline-flex absolute left-3 bottom-3 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2">{cart.length}</span>
                        </div>

                    </motion.div>
                    <motion.div whileTap={{ scale: 0.8 }}>
                        <Link to={isUserLoggedIn ? "/profile" : "/login"}>
                            <UserIcon className="h-6 w-6 hover:text-sky-600 duration-200" />
                        </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.8 }} className=" md:hidden" onClick={() => { searchState && setSearchState(false); setMenuState(!menuState); }}>
                        <Bars3Icon className="h-6 w-6 hover:text-sky-600 duration-200" />
                    </motion.div>
                </div>



            </motion.nav>
            {/* <div className={`z-50 flex w-full justify-center ${(searchState && !isCartOpen)? "visible":"hidden"}`}>
                <input type="text" name="search" placeholder="Search" className="z-50 absolute bg-gray-400/20 w-full md:w-[70%] h-11  rounded-3xl px-5 outline-sky-700" />
        </div> */}
            {brandModal && !isMobile && <motion.div initial={{ y: -20, scaleX: 0.4, opacity: 0.7 }} animate={{ scaleX: 1, y: 0, opacity: 1 }} transition={{ type: "spring" }} id="brandsHover" style={{ left: brandsPostion }} className={`z-[9999] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 w-min-44`}>
                <ul className="py-2 text-sm text-gray-700 grid-rows-5 grid-flow-col" aria-labelledby="dropdownHoverButton">
                    {brands.map((brand, i) => (
                        <li key={i}>
                            <Link to={`brands/${brand}`} className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg hover:text-sky-600">{brand}</Link>
                        </li>

                    ))}

                </ul>
            </motion.div>}
            {categoryModal && !isMobile && <motion.div initial={{ y: -20, scaleX: 0.4, opacity: 0.7 }} animate={{ scaleX: 1, y: 0, opacity: 1 }} transition={{ type: "spring" }} id="categoryHover" style={{ left: categoryPostion }} className={`z-[9999] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-min-44`}>
                <ul className="py-2 text-sm text-gray-700 grid grid-rows-5 grid-flow-col" aria-labelledby="dropdownHoverButton">
                    {categories.map((cat, i) => (
                        <li key={i}>
                            <Link to={`category/${cat}`} className="block px-4 py-2 hover:bg-gray-100 hover:text-sky-600">{cat}</Link>
                        </li>

                    ))}

                </ul>
            </motion.div>}

            {(searchState && !isCartOpen) && <Search onPressCLose={() => setSearchState(false)} />}

        </>
    )
}

export default Navbar