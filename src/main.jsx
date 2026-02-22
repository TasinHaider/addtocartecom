import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import Login from './outercomponents/Login'
import HomePage from './components/Home/index.jsx';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import OTPverifyPage from './components/OTPverifyPage/index.jsx';
import AddProduct from './components/AddProduct.jsx';
import AllProduct from './components/AllProduct.jsx';
import Registration from './outercomponents/Registration.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import CartPage from './components/CartPage.jsx';
import store from './../store.js'
import { Provider } from 'react-redux'
import ProductDetails from './components/ProductDetails.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otpverification" element={<OTPverifyPage />} />

      <Route path="/home" element={<HomePage />}>
        <Route index element={<WelcomeScreen />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="allproduct" element={<AllProduct />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="cartpage" element={<CartPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
