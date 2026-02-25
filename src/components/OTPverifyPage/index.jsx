import { MdOutlineEmail } from 'react-icons/md'
import { GoNumber } from "react-icons/go";
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router';

const OTPverifyPage = () => {

    let navigate = useNavigate()
    const { state } = useLocation()

    // ✅ save to sessionStorage on arrival, fallback on refresh
    const resolvedEmail = state?.email || sessionStorage.getItem('otp_email') || ''
    if (state?.email) sessionStorage.setItem('otp_email', state.email)

    let [loading, setLoading] = useState(false)
    let [verifyData, setverifyData] = useState({
        email: resolvedEmail, // ✅ fixed
        otp: ''
    })
    const handleChange = (e) => {
        setverifyData({ ...verifyData, [e.target.name]: e.target.value })
    }

    //submit button
    const handleOTPClick = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('https://addtocartecom-backend.vercel.app/api/v1/auth/verifyotp', {
                email: verifyData.email,
                otp: verifyData.otp
            });
            if (response.data.success) {
                toast.success(response.data.message)
                sessionStorage.removeItem('otp_email') // ✅ clear after success
                setverifyData({ email: '', otp: '' })
                setTimeout(() => navigate('/login'), 3000)
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false)
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
                                readOnly={!!resolvedEmail} // ✅ fixed
                                disabled={loading}
                                className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333] disabled:opacity-50"
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
                                disabled={loading}
                                className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333] disabled:opacity-50"
                            />
                            <div className="absolute left-4">
                                <GoNumber />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleOTPClick}
                        type="button"
                        disabled={loading}
                        className="mt-8 w-full px-4 py-2.5 mx-auto block text-[15px] font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Verifying...
                            </>
                        ) : 'Submit'}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default OTPverifyPage