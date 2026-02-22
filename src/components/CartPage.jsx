import React from 'react'
import { useLocation } from 'react-router';

const CartPage = () => {

    const location = useLocation();

    // Access the data sent from AllProduct
    const product = location.state;
    console.log(product);


    return (
        <section>
            <div>
                <div className="grid lg:grid-cols-3">
                    <div className="lg:col-span-2 p-6 bg-white overflow-x-auto">
                        <div className="flex gap-2 border-b border-gray-300 pb-4">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Shopping Cart
                            </h2>
                        </div>
                        <table className="mt-6 w-full border-collapse">
                            <thead className="whitespace-nowrap text-left">
                                <tr>
                                    <th className="text-base text-slate-500 p-4 font-medium">
                                        Description
                                    </th>
                                    <th className="text-base text-slate-500 p-4 font-medium">
                                        Quantity
                                    </th>
                                    <th className="text-base text-slate-500 p-4 font-medium">Price</th>
                                </tr>
                            </thead>
                            <tbody className="whitespace-nowrap divide-y divide-gray-300">
                                <tr>
                                    <td className="p-4">
                                        <div className="flex items-center gap-4 w-max">
                                            <div className="w-24 h-24 shrink-0">
                                                <img
                                                    src={product.image}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-medium text-slate-900">
                                                    {product.name}
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="mt-3 font-medium text-red-500 text-sm cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2 w-max rounded-full">
                                            <button
                                                type="button"
                                                className="border-0 outline-0 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-slate-900 text-sm font-semibold px-3">
                                                1
                                            </span>
                                            <button
                                                type="button"
                                                className="border-0 outline-0 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <h4 className="text-base font-semibold text-slate-900">${product.price}</h4>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 p-6 lg:sticky lg:top-0 lg:h-screen">
                        <h2 className="text-xl font-semibold text-slate-900 border-b border-gray-300 pb-4">
                            Order Summary
                        </h2>
                        <ul className="text-slate-500 font-medium divide-y divide-gray-300 mt-6">
                            <li className="flex flex-wrap gap-4 text-base py-3">
                                Subtotal{" "}
                                <span className="ml-auto font-semibold text-slate-900">$88.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base py-3">
                                Shipping{" "}
                                <span className="ml-auto font-semibold text-slate-900">$4.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base py-3">
                                Tax{" "}
                                <span className="ml-auto font-semibold text-slate-900">$4.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base py-3 font-semibold text-slate-900">
                                Total <span className="ml-auto">$96.00</span>
                            </li>
                        </ul>
                        <button
                            type="button"
                            className="mt-6 text-base font-medium px-4 py-2 tracking-wide w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default CartPage