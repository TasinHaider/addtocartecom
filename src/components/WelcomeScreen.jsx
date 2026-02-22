import React from 'react';
import { ProductOutlined } from '@ant-design/icons';

const WelcomeScreen = () => {
    return (
        <div className="flex flex-col items-center h-200 justify-center bg-white shadow-sm transition-all duration-500">
            {/* Animated Icon Container */}
            <div className="bg-blue-50 p-6 rounded-full mb-6 animate-bounce">
                <ProductOutlined style={{ fontSize: '48px', color: '#3b82f6' }} />
            </div>

            {/* Personalized Message */}
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Please create your product, <span className="text-blue-600">Tanvir vai</span>
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
                Select "Add Product" from the sidebar to get started.
            </p>

            {/* Decorative element */}
            <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
            </div>
        </div>
    );
};

export default WelcomeScreen;