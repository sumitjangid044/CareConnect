import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl mx-auto p-3'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white rounded text-sm max-h-[80vh] overflow-y-auto'>

                {/* Desktop Header */}
                <div className='hidden md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {appointments.map((item, index) => (

                    <div key={index} className='border-b px-3 py-4'>

                        {/* ✅ MOBILE VIEW */}
                        <div className='flex flex-col gap-2 md:hidden'>

                            {/* Top Row */}
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <img className='w-9 h-9 rounded-full' src={item.userData.image} alt="" />
                                    <div>
                                        <p className='font-medium'>{item.userData.name}</p>
                                        <p className='text-xs text-gray-500'>
                                            Age: {calculateAge(item.userData.dob)}
                                        </p>
                                    </div>
                                </div>

                                <p className='text-sm font-medium'>
                                    {currency}{item.amount}
                                </p>
                            </div>

                            {/* Middle */}
                            <p className='text-xs text-gray-500'>
                                {slotDateFormat(item.slotDate)}, {item.slotTime}
                            </p>

                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
                                <p className='text-sm'>{item.docData.name}</p>
                            </div>

                            {/* Bottom Row */}
                            <div className='flex justify-between items-center'>

                                {/* Status */}
                                {item.cancelled
                                    ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                                    : item.isCompleted
                                        ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                        : <p className='text-blue-500 text-xs font-medium'>Pending</p>
                                }

                                {/* Action */}
                                {!item.cancelled && !item.isCompleted && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='border rounded-full w-7 h-7 flex items-center justify-center text-red-500'
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>


                        {/* ✅ DESKTOP VIEW */}
                        <div className='hidden md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500'>

                            <p>{index + 1}</p>

                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                                <p>{item.userData.name}</p>
                            </div>

                            <p>{calculateAge(item.userData.dob)}</p>

                            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                            <div className='flex items-center gap-2'>
                                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
                                <p>{item.docData.name}</p>
                            </div>

                            <p>{currency}{item.amount}</p>

                            {item.cancelled
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                : item.isCompleted
                                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                    : <img
                                        onClick={() => cancelAppointment(item._id)}
                                        className='w-8 cursor-pointer'
                                        src={assets.cancel_icon}
                                        alt=""
                                    />
                            }

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default AllAppointments