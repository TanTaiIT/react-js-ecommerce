import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Product from './pages/Product'
import Detail from './pages/Single'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Shipping from './pages/Shipping';
import PaymentMethod from './pages/PaymentMethod'
import Order from './pages/Order';
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Profile from './pages/ProfileScreen'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pageNumber/:pageNumber' element={<Home />} exact />
        <Route exact path='/' element={<Home />} />
        <Route path="/search/:keyword/pageNumber/:pageNumber" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/product/:category' element={<Product />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/method' element={<PaymentMethod />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment/:id' element={<Payment />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
