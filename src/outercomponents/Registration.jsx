import axios from 'axios'
import React, { useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const Registration = () => {

    let navigate = useNavigate()

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
        try {
            const response = await axios.post('https://addtocartecom-backend.vercel.app/api/v1/auth/signup', formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({ name: "", email: "", password: "" });

                setTimeout(() => {
                    navigate('/otpverification')
                }, 3000);

            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Something went wrong";
            toast.error(errorMsg);
            console.error(errorMsg);
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
                                    name="name"
                                    type="text"
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm mb-2 block">Email</label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="text"
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="text-slate-900 text-sm mb-2 block">Password</label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="py-3 px-6 text-sm text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                            >
                                Register
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 mt-6">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-blue-600 font-semibold hover:underline ml-1"
                            >
                                Login here
                            </a>
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