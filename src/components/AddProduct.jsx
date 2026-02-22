import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { FiUploadCloud, FiDollarSign, FiType, FiAlignLeft } from 'react-icons/fi';
import { Link } from 'react-router';

const AddProduct = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        images: []
    });
    const handleChange = (e) => {
        if (e.target.name === 'images') {
            // Convert FileList to Array for professional handling
            setProduct({ ...product, images: Array.from(e.target.files) });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };
    console.log(product);

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);

        // This 'images' key must match upload.array('images') in your route
        product.images.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post('http://localhost:3000/api/v1/product/createproduct', formData,
                {
                    headers:
                        { 'Content-Type': 'multipart/form-data' }
                }
            );
            console.log("Success:", response.data);
            messageApi.open({
                type: 'success',
                content: 'Product created successfully!',
            });
        } catch (error) {
            console.error("Upload Error:", error.response?.data || error.message);
            messageApi.open({
                type: 'error',
                content: 'Failed to upload product',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-5 px-4 sm:px-6 lg:px-8 font-sans">
            {contextHolder}
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Product</h1>
                    <p className="mt-2 text-sm text-gray-600">Fill in the details below to add a new item.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FiType className="mr-2 text-blue-500" /> Product Title
                            </label>
                            <input
                                required
                                name='title'
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter product name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FiAlignLeft className="mr-2 text-blue-500" /> Description
                            </label>
                            <textarea
                                required
                                name='description'
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the features..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            ></textarea>
                        </div>

                        {/* Price */}
                        <div className="w-full md:w-1/2">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FiDollarSign className="mr-2 text-blue-500" /> Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                <input
                                    required
                                    name='price'
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div>
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <FiUploadCloud className="mr-2 text-blue-500" /> Product Images
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group relative">
                                <div className="space-y-2 text-center">
                                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                                            <span>{product.images.length > 0 ? `${product.images.length} files selected` : "Upload files"}</span>
                                            <input name='images' onChange={handleChange} type="file" multiple className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase">jpeg, jpg, png, gif up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-50">
                            <Link to='/home'
                                type="button" className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all disabled:bg-gray-400 disabled:scale-100"
                            >
                                Publish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;