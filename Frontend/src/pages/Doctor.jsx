import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    // ✅ Normalize function (MOST IMPORTANT)
    const normalize = (str) => str.toLowerCase().replace(/\s/g, '')

    // ✅ Filter Logic FIXED
    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(
                doctors.filter(doc =>
                    normalize(doc.speciality) === normalize(speciality)
                )
            )
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors speciality.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                {/* FILTER BUTTON (mobile) */}
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5f6FFF] text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>

                {/* FILTER LIST */}
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

                    {[
                        "General physician",
                        "Gynecologist",
                        "Dermatologist",
                        "Pediatricians",
                        "Neurologist",
                        "Gastroenterologist"
                    ].map((item, i) => (

                        <p
                            key={i}
                            onClick={() =>
                                normalize(speciality || '') === normalize(item)
                                    ? navigate('/doctor')
                                    : navigate(`/doctor/${item}`)
                            }
                            className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 
                            ${normalize(speciality || '') === normalize(item) ? "bg-indigo-100 text-black" : ""}`}
                        >
                            {item}
                        </p>

                    ))}

                </div>

                {/* DOCTORS GRID */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500'
                            key={index}
                        >
                            <img className='bg-blue-50' src={item.image} alt="" />

                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>

                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Doctor