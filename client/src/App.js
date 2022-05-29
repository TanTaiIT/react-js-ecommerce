import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Product from './pages/Product'
import Detail from './pages/Single'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Shipping from './pages/Shipping';
import PaymentMethod from './pages/PaymentMethod'
import Order from './pages/Order';
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Profile from './pages/ProfileScreen'
import PrivateRouter from './PrivateRoute';
import NotFound from './pages/NotFound';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pageNumber/:pageNumber' element={<Home />} exact />
        <Route path='/product/pageNumber/:page' element={<Product />} />
        <Route path='/product/pageNumber/:category/:page' element={<Product />} />
        <Route exact path='/' element={<Home />} />
        <Route path="/search/:keyword/pageNumber/:pageNumber" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/product/:category' element={<Product />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path='/shipping' element={<PrivateRouter><Shipping /></PrivateRouter>} />
        <Route path='/method' element={<PrivateRouter><PaymentMethod /></PrivateRouter>} />
        <Route path='/order' element={<PrivateRouter><Order /></PrivateRouter>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment/:id' element={<PrivateRouter><Payment /></PrivateRouter>} />
        <Route path='/profile/:id' element={<PrivateRouter><Profile /></PrivateRouter>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
