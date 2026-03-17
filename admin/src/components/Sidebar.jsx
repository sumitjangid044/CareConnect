import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = ({ open, setOpen }) => {

    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const location = useLocation()

    // route change → close sidebar
    useEffect(() => {
        setOpen(false)
    }, [location])

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-white z-50 w-64
                transform ${open ? 'translate-x-0' : '-translate-x-full'}
                transition-transform duration-300
                md:static md:translate-x-0
            `}>

                {/* Close button (mobile) */}
                <div className="flex justify-end md:hidden p-3">
                    <button onClick={() => setOpen(false)}>✕</button>
                </div>

                {/* ADMIN */}
                {aToken && (
                    <ul className='text-[#515151] mt-5'>

                        <NavLink to='/admin-dashboard' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.home_icon} />
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink to='/all-appointments' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.appointment_icon} />
                            <p>Appointments</p>
                        </NavLink>

                        <NavLink to='/add-doctor' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.add_icon} />
                            <p>Add Doctor</p>
                        </NavLink>

                        <NavLink to='/doctors-list' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.people_icon} />
                            <p>Doctors List</p>
                        </NavLink>

                    </ul>
                )}

                {/* DOCTOR */}
                {dToken && (
                    <ul className='text-[#515151] mt-5'>

                        <NavLink to='/doctor-dashboard' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.home_icon} />
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink to='/doctor-appointments' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.appointment_icon} />
                            <p>Appointments</p>
                        </NavLink>

                        <NavLink to='/doctor-profile' onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3.5 px-4 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : ''}`}>
                            <img src={assets.people_icon} />
                            <p>Profile</p>
                        </NavLink>

                    </ul>
                )}
            </div>
        </>
    )
}

export default Sidebar