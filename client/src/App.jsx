import './App.css'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";

import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from './pages/not-found';
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'



function App() {

  return (
    <>
      <div  className="flex flex-col overflow-hidden bg-white">
        <h1>Header Component</h1>


        <Routes>

          <Route path='/auth' element={<AuthLayout/>}>
            <Route path='login' element={<AuthLogin/>}/>
            <Route path='register' element={<AuthRegister/>}/>
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route path='products' element={<AdminProducts/>}/>
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
          </Route>

          <Route path='/shop' element={<ShoppingLayout />}>
            <Route path='*' element={<NotFound/>}/>
            <Route path='checkout' element={<ShoppingCheckout/>}/>
            <Route path='home' element={<ShoppingHome/>}/>
            <Route path='listing' element={<ShoppingListing/>}/>
            <Route path='account' element={<ShoppingAccount/>}/>

          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
