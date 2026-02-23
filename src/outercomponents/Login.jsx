import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { loggedIn } from '../components/Slices/UserSlice';

const Login = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch(); //data to redux

    const [formData, setformData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    //sign in
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://addtocartecom-backend.vercel.app/api/v1/auth/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data) {
                dispatch(loggedIn(response.data));
                localStorage.setItem('userInfo', JSON.stringify(response.data)); //save to localstorage
                toast.success(response.data.message)
                setformData({ email: '', password: '' });
                setTimeout(() => {
                    navigate('/home')
                }, 3000)
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <section className='w-full'>
            <div className='container h-screen flex items-center justify-center'>
                <form className="space-y-4 max-w-md mx-auto font-inter">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Login To Your Account</h2>
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
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        name='email'
                        type="email"
                        placeholder="Enter Email"
                        className="px-4 py-3 text-slate-900 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded-md"
                    />
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        name='password'
                        type="password"
                        placeholder="Enter Password"
                        className="px-4 py-3 text-slate-900 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded-md"
                    />
                    <button
                        onClick={handleSignIn}
                        type="button"
                        className="!mt-8 w-full px-4 py-2.5 mx-auto block text-[15px] font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Login