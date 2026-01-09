import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header.jsx";
import Product from "./Product.jsx";
import { useDispatch } from "react-redux";
import { clearAllItem } from "./redux/slice.js";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import CartList from "./CartList.jsx";
import ContactForm from "./ContactForm.jsx";
import MyOrder from "./MyOrder.jsx";
import Login from './pages/Login.jsx';
import Register  from "./pages/Register.jsx"; 
import Profile from './pages/Profile.jsx';
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
            <Route path='/' element={<Product />} />
            <Route path='/cart-list' element={<CartList />} />
            <Route path='/contact-form' element={<ContactForm />} />
            <Route path='/my-order' element={<MyOrder />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
