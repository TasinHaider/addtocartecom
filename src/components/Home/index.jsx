import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Menu } from 'antd';
import { ProductOutlined, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { SiHomepage } from 'react-icons/si';

const HomePage = () => {
    let navigate = useNavigate()

    //redux data check or go to login page
    let userData = useSelector((state) => state.userInfo.value)
    console.log(userData);
    useEffect(() => {
        if (!userData) {
            navigate('/login')
        }
    }, [])

    //items
    const items = [
        {
            key: 'sub1',
            label: 'Landing Page',
            icon: <SiHomepage />,
            children: [
                { key: '/home', label: 'Home Page' },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'sub2',
            label: 'Products',
            icon: <ProductOutlined />,
            children: [
                { key: '/home/addproduct', label: 'Add Product' },
                { key: '/home/allproduct', label: 'All Product' },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'sub3',
            label: 'Cart',
            icon: <HeartOutlined />,
            children: [
                { key: '/home/cartpage', label: 'View Cart' },
            ],
        },
        {
            type: 'divider',
        }
    ];

    const onClick = e => {
        navigate(e.key);
    }

    return (
        <>
            <div className='flex gap-4 p-6'>
                <div className='w-1/5'>
                    <Menu
                        onClick={onClick}
                        style={{ width: 280 }}
                        mode="inline"
                        items={items} />
                </div>

                <div className='w-4/5'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default HomePage;