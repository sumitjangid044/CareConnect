import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setOpen }) => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white'>

            {/* LEFT SIDE */}
            <div className='flex items-center gap-3'>

                {/* ☰ Mobile Menu Button */}
                <button
                    onClick={() => setOpen(true)}
                    className='md:hidden text-xl'
                >
                    ☰
                </button>

                <img className='w-32 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />

                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs'>
                    {aToken ? "Admin" : "Doctor"}
                </p>
            </div>

            {/* RIGHT SIDE */}
            <button
                onClick={logout}
                className='bg-[#5F6FFF] text-white text-sm px-6 sm:px-10 py-2 rounded-full'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar