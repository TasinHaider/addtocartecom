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
            setProduct({ ...product, images: Array.from(e.target.files) });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        product.images.forEach((file) => formData.append('images', file));

        try {
            const response = await axios.post('http://localhost:3000/api/v1/product/createproduct', formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log("Success:", response.data);
            messageApi.open({ type: 'success', content: 'Product created successfully!' });
        } catch (error) {
            console.error("Upload Error:", error.response?.data || error.message);
            messageApi.open({ type: 'error', content: 'Failed to upload product' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
            {contextHolder}
            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl p-8">

                <h1 className="text-xl font-bold text-gray-800 mb-1">Add New Product</h1>
                <p className="text-sm text-gray-400 mb-8">Fill in the details to publish a product.</p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                            <FiType size={14} /> Title
                        </label>
                        <input
                            required
                            name='title'
                            onChange={handleChange}
                            type="text"
                            placeholder="Product name"
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                            <FiAlignLeft size={14} /> Description
                        </label>
                        <textarea
                            required
                            name='description'
                            onChange={handleChange}
                            rows="3"
                            placeholder="Describe the product..."
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 transition resize-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                            <FiDollarSign size={14} /> Price
                        </label>
                        <input
                            required
                            name='price'
                            onChange={handleChange}
                            type="number"
                            placeholder="0.00"
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 transition"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                            <FiUploadCloud size={14} /> Images
                        </label>
                        <label className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                            <FiUploadCloud className="text-gray-300 mb-2" size={28} />
                            <span className="text-sm text-blue-500 font-medium">
                                {product.images.length > 0 ? `${product.images.length} files selected` : 'Click to upload'}
                            </span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                            <input name='images' onChange={handleChange} type="file" multiple className="hidden" />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link to='/home' className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition active:scale-95"
                        >
                            Publish
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;