import './App.css';
import { Route, Routes } from 'react-router-dom';

import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";

import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from './pages/not-found';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingAccount from './pages/shopping-view/account';

import CheckAuth from './components/common/check-auth';
import UnAuthPage from './pages/un-auth-page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"




function App() {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth())
  }, [dispatch])

  if(isLoading)  return <Skeleton className="w-[800px] h-[20px] bg-black" />

  console.log(isLoading, user)
  
  return (
    <>
      <div  className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user ={ user}>
             <AuthLayout/>
            </CheckAuth >
          }>
            
            <Route path='login' element={<AuthLogin/>}/>
            <Route path='register' element={<AuthRegister/>}/>
          </Route>

          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user ={ user}>
             <AdminLayout/>
           </CheckAuth >
          }>
            <Route path='products' element={<AdminProducts/>}/>
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
          </Route>

          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user ={ user}>
             <ShoppingLayout />          
           </CheckAuth >
          }>
            
            <Route path='checkout' element={<ShoppingCheckout/>}/>
            <Route path='home' element={<ShoppingHome/>}/>
            <Route path='listing' element={<ShoppingListing/>}/>
            <Route path='account' element={<ShoppingAccount/>}/>
          </Route>
          
          <Route path='/unauth-page' element={<UnAuthPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
