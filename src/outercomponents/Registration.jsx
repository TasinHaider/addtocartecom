import axios from 'axios'
import React, { useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const Registration = () => {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // form submit handler
    let handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('https://addtocartecom-backend.vercel.app/api/v1/auth/signup', formData);
            if (response.data.success) {
                toast.success(response.data.message);
                const email = formData.email
                setFormData({ name: "", email: "", password: "" });
                setTimeout(() => navigate('/otpverification', { state: { email } }), 3000);
            } else if (response.data.isUnverified) {
                toast.warning(response.data.message);
                setTimeout(() => navigate('/otpverification', { state: { email: formData.email } }), 3000);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Something went wrong";
            toast.error(errorMsg);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section>
            <div className="min-h-screen flex fle-col items-center justify-center p-6">
                <div className="grid lg:grid-cols-2 items-center gap-8 max-w-6xl max-lg:max-w-lg w-full">
                    <form className="lg:max-w-md w-full">
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
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
                        <h1 className="text-slate-900 text-3xl font-semibold mb-8">
                            Create an account
                        </h1>
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-900 text-sm mb-2 block">Name</label>
                                <input
                                    onChange={handleChange}
                                    value={formData.name}
                                    name="name"
                                    type="text"
                                    disabled={loading}
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all disabled:opacity-50"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm mb-2 block">Email</label>
                                <input
                                    onChange={handleChange}
                                    value={formData.email}
                                    name="email"
                                    type="text"
                                    disabled={loading}
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all disabled:opacity-50"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm mb-2 block">Password</label>
                                <input
                                    onChange={handleChange}
                                    value={formData.password}
                                    name="password"
                                    type="password"
                                    disabled={loading}
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all disabled:opacity-50"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                disabled={loading}
                                className="py-3 px-6 text-sm text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Registering...
                                    </>
                                ) : 'Register'}
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </form>
                    <div className="h-full">
                        <img
                            src="https://readymadeui.com/login-image.webp"
                            className="w-full h-full object-contain aspect-[628/516]"
                            alt="login img"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration