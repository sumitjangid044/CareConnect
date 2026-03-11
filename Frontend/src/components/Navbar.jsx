import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const {token, setToken, userData} = useContext(AppContext)
    // const [token, setToken] = useState(true);
    const profileRef = useRef(null);

    const logout = ()=> {
        setToken(false)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-gray-400'>

            <img onClick={() => navigate('/')} className='w-36 cursor-pointer' src={assets.logo} alt="" />

            <ul className='hidden md:flex gap-6 font-medium'>

                <li>
                    <NavLink to="/" >
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                HOME
                                <hr className={`h-0.5 bg-[#5f6FFF] w-2/3 border-none ${isActive ? "block" : "hidden"}`} />
                            </div>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/doctor">
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                ALL DOCTORS
                                <hr className={`h-0.5 bg-[#5f6FFF] w-2/3 border-none ${isActive ? "block" : "hidden"}`} />
                            </div>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/about">
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                ABOUT
                                <hr className={`h-0.5 bg-[#5f6FFF] w-2/3 border-none ${isActive ? "block" : "hidden"}`} />
                            </div>
                        )}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/contact">
                        {({ isActive }) => (
                            <div className="flex flex-col items-center">
                                CONTACT
                                <hr className={`h-0.5 bg-[#5f6FFF] w-2/3 border-none ${isActive ? "block" : "hidden"}`} />
                            </div>
                        )}
                    </NavLink>
                </li>

            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div ref={profileRef} onClick={() => setShowProfileMenu(p => !p)} className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={userData.image} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className={`absolute right-0 top-12 z-60 ${showProfileMenu ? 'block' : 'hidden'} `}>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => {navigate('/my-profile'); setShowProfileMenu(false)}} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block">Create Account</button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/*---- Mobile Menu ----- */}
                <div className={` fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                    <div className='flex items-center justify-between py-6 px-5 '>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded  inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctor'><p className='px-4 py-2 rounded  inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded  inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded  inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Navbar
