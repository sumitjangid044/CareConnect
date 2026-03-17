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
        <div className='flex justify-between items-center px-4 py-3 bg-white'>

            {/* LEFT */}
            <div className='flex items-center gap-1 sm:gap-2 flex-1 min-w-0'>

                {/* ☰ Mobile Menu */}
                <button
                    onClick={() => setOpen(true)}
                    className='md:hidden text-xl'
                >
                    ☰
                </button>

                {/* Logo */}
                <img
                    className='w-28 sm:w-36 shrink-0'
                    src={assets.admin_logo}
                    alt=""
                />

                {/* Admin / Doctor Badge */}
                <p className='border px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs text-gray-600 whitespace-nowrap'>
                    {aToken ? "Admin" : "Doctor"}
                </p>
            </div>

            {/* RIGHT */}
            <button
                onClick={logout}
                className='bg-[#5F6FFF] text-white text-xs sm:text-sm px-4 sm:px-8 py-2 rounded-full whitespace-nowrap'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar