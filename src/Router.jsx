import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Cart from "./Pages/Cart/Cart";
import Auth from './Pages/Auth/Auth'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtctedRoute/ProtectedRoutes'


const stripePromise = loadStripe('pk_test_51Pgaey2L3Gc6xKWnMNojHDNoUPc1jrqKPSMJc40uL7SWz0iXIZGzLUIH7UYb65kt3Mjsa8BaQrmDJ0PvyUROpTMc00TB3CXZRA');
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments"
         element={
          <ProtectedRoute msg={"you must login to pay"}  redirect={"/payments"} >
            <Elements stripe={stripePromise}>
            <Payment />
          </Elements>

          </ProtectedRoute>

       } />


        <Route path="/orders" element={
          <ProtectedRoute msg={"you must log to access your  orders"}
          redirect={"/orders"}>
              <Orders />
          </ProtectedRoute>
}/>



        <Route path="/category/:categoryName" element={<Results/>}/>
        <Route path="/products/:productId" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
