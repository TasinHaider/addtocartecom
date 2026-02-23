import { MdOutlineEmail } from 'react-icons/md'
import { GoNumber } from "react-icons/go";
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useNavigate } from 'react-router';


const OTPverifyPage = () => {

    let navigate = useNavigate()

    let [verifyData, setverifyData] = useState({
        email: '',
        otp: ''
    })
    const handleChange = (e) => {
        setverifyData({ ...verifyData, [e.target.name]: e.target.value })
    }

    //submit button
    const handleOTPClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://addtocartecom-backend.vercel.app/api/v1/auth/verifyotp', {
                email: verifyData.email,
                otp: verifyData.otp
            });
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message)
                setverifyData({ email: '', otp: '' })
                
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
            console.log(error);
        }

    }

    return (
        <section>
            <div className='container h-screen flex justify-center items-center'>
                <div className="space-y-8 w-2/5 font-inter">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">OTP VERIFICATION</h2>
                    <ToastContainer
                        position="top-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                        transition={Slide}
                    />
                    <div>
                        <label className="mb-2 text-sm text-slate-900 font-medium block">
                            Your Email
                        </label>
                        <div className="relative flex items-center">
                            <input
                                name='email'
                                onChange={handleChange}
                                value={verifyData.email}
                                type="text"
                                placeholder="Enter Email"
                                className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333]"
                            />
                            <div className="absolute left-4">
                                <MdOutlineEmail />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 text-sm text-slate-900 font-medium block">
                            Your OTP
                        </label>
                        <div className="relative flex items-center">
                            <input
                                name='otp'
                                onChange={handleChange}
                                value={verifyData.otp}
                                type="number"
                                placeholder="Enter otp"
                                className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333]"
                            />
                            <div className="absolute left-4">
                                <GoNumber />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleOTPClick}
                        type="button"
                        className="mt-8 w-full px-4 py-2.5 mx-auto block text-[15px] font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                        Submit
                    </button>
                </div>


            </div>
        </section>
    )
}

export default OTPverifyPage