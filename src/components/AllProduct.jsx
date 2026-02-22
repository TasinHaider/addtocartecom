import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { message } from 'antd';
import { useNavigate } from 'react-router';

const AllProduct = () => {

    let navigate = useNavigate();
    let [messageApi, contextHolder] = message.useMessage();

    //get all product
    let [products, setproducts] = useState([]);
    useEffect(() => {
        async function allproducts() {
            let response = await axios.get('http://localhost:3000/api/v1/product/allproduct')
            setproducts(response.data.data);
        }
        allproducts();
    }, [])
    console.log(products);

    //delete product
    const handleDelete = async (id) => {
        try {
            let response = await axios.delete(`http://localhost:3000/api/v1/product/deleteproduct/${id}`);

            if (response.data.success) {
                // 2. Update UI state: Filter out the deleted product so it vanishes instantly
                const updatedProducts = products.filter(item => item._id !== id);
                setproducts(updatedProducts);
                messageApi.open({
                    type: 'success',
                    content: 'Product deleted successfully',
                });
            }
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            messageApi.open({
                type: 'error',
                content: 'Failed to delete product',
            });
        }
    }

    //go by slug to details page
    const handleDetails = (slug) => {
        navigate(`/home/product/${slug}`);
    };

    return (
        <section className="bg-white p-4 min-h-screen">
            <div className="mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
                {contextHolder}
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8">
                    All Products
                </h2>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500 text-lg">Tanvir vai, No products available for now. Please add some products.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div key={item._id} onClick={() => handleDetails(item.slug)} className="bg-white shadow-sm border border-gray-200 rounded-lg p-3 flex flex-col">
                                <div className="block cursor-pointer">
                                    <div className="aspect-[12/11] bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image[0]}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="flex items-start justify-between mt-4">
                                        <h5 className="text-base font-semibold text-slate-900 line-clamp-1">
                                            {item.title}
                                        </h5>
                                        <h6 className="text-base text-indigo-600 font-bold ml-2">
                                            ${item.price}
                                        </h6>
                                    </div>

                                    <p className="text-slate-600 text-[13px] mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Buttons pushed to bottom */}
                                <div className="flex items-center gap-2 mt-auto pt-6">
                                    <div
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-pink-50 hover:bg-pink-100 text-pink-500 w-12 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors"
                                        title="Delete Product"
                                    >
                                        <RiDeleteBin6Fill />
                                    </div>
                                    <button
                                        onClick={() => handleDetails(item.slug)}
                                        type="button"
                                        className="text-sm px-4 py-2 font-medium cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all rounded-lg"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default AllProduct