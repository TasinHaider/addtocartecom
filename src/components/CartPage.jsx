import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { message } from 'antd'

const CartPage = () => {

    const [cartItems, setCartItems] = useState([])
    let [messageApi, contextHolder] = message.useMessage()

    // user data from Redux
    let userData = useSelector((state) => state.userInfo.value)

    // fetch cart items
    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/cart/allcart', {
                    params: { user: userData.data._id }
                })
                setCartItems(response.data.data)
            } catch (error) {
                if (error.response?.status !== 404) {
                    console.error("Failed to fetch cart:", error)
                }
                setCartItems([])
            }
        }
        fetchCart()
    }, [userData])

    // handle delete
    const handleDelete = async (cartId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/cart/deletecart/${cartId}`)
            messageApi.open({ type: 'success', content: 'Item removed from cart.' })
            setCartItems((prev) => prev.filter((item) => item._id !== cartId))
        } catch (error) {
            messageApi.open({ type: 'error', content: error.response?.data?.message || 'Failed to remove item.' })
        }
    }

    //handle quantity change
    const handleQuantityChange = async (cartId, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems((prev) =>
            prev.map((item) => item._id === cartId ? { ...item, quantity: newQuantity } : item)
        )
        messageApi.open({ type: 'success', content: 'Quantity updated.' })
    }

    let totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <section>
            {contextHolder}
            <div className="p-4">
                <div className="xl:max-w-screen-xl lg:max-w-screen-lg max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 mt-12">Your cart is empty.</div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4 border border-gray-200 p-4">

                                        <img
                                            src={item.product?.image?.[0]}
                                            alt={item.product?.title}
                                            className="w-20 h-20 object-contain object-top shrink-0"
                                        />

                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-slate-900">{item.product?.title}</h3>

                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="text-sm text-gray-500">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100 cursor-pointer text-sm font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="text-sm font-bold text-slate-900 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item._id)}
                                            className="text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
                                        >
                                            Remove
                                        </button>

                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-8 border-t border-gray-300 pt-4 flex justify-between items-center">
                                <p className="text-lg font-semibold text-slate-900">Total</p>
                                <p className="text-xl font-bold text-slate-900">${totalAmount.toFixed(2)}</p>
                            </div>

                            <button type="button" className="mt-6 w-full py-3 border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold">
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CartPage