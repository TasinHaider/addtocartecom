import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { message } from 'antd'

const ProductDetails = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState(null)
    const [mainImage, setMainImage] = useState('')
    let [messageApi, contextHolder] = message.useMessage();

    //user data from Redux
    let userData = useSelector((state) => state.userInfo.value)
    console.log(userData.data);

    //fetch product by slug
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/product/${slug}`)
                setProduct(response.data.data)
                setMainImage(response.data.data.image?.[0])  // image not images
            } catch (error) {
                console.error("Failed to fetch product:", error)
            }
        }
        fetchProduct()
    }, [slug])

    if (!product) return <div className="p-8 text-center">Loading...</div>

    //handle add to cart
    const handleAddToCart = async () => {
        if (!userData) {
            messageApi.open({ type: 'warning', content: 'Please login to add items to cart.' })
            return
        }

        try {
            await axios.post('http://localhost:3000/api/v1/cart/addtocart', {
                user: userData.data._id, 
                product: product._id,
                quantity: 1
            })
            messageApi.open({ type: 'success', content: 'Product added to cart!' })
        } catch (error) {
            messageApi.open({ type: 'error', content: error.response?.data?.message || 'Failed to add to cart.' })
        }
    }
    return (
        <section>
            {contextHolder}
            <div className="p-4">
                <div className="xl:max-w-screen-xl lg:max-w-screen-lg max-w-xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">

                        {/* Image Gallery */}
                        <div className="w-full lg:sticky top-0 lg:col-span-3">
                            <div className="flex flex-row gap-2">
                                {/* Thumbnails */}
                                <div className="flex flex-col gap-2 w-16 max-sm:w-10 shrink-0">
                                    {product.image?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`Product${i + 1}`}
                                            onClick={() => setMainImage(img)}
                                            className={`aspect-[64/85] object-contain object-top w-full cursor-pointer border-b-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                                        />
                                    ))}
                                </div>

                                {/* Main Image - outside the map */}
                                <div className="flex-1">
                                    <img
                                        src={mainImage}
                                        alt="Main Product"
                                        className="w-full aspect-[750/800] object-top object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:col-span-2">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
                                <div className="flex items-center space-x-1 mt-2">
                                    {[...Array(4)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                    ))}
                                    <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <p className="text-sm text-slate-900 !ml-3">4.0 (150)</p>
                                </div>
                                <div className="flex items-center flex-wrap gap-4 mt-6">
                                    <h4 className="text-slate-900 text-2xl font-bold">${product.price}</h4>
                                    <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                                </div>
                            </div>
                            <hr className="my-6 border-gray-300" />
                            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <button type="button" className="px-4 py-3 w-[45%] cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200 text-slate-900 text-sm font-semibold">
                                    Add to wishlist
                                </button>
                                <button type="button" onClick={handleAddToCart} className="px-4 py-3 w-[45%] cursor-pointer border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold">
                                    Add to cart
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails