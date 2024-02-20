
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Addproduct from './Components/Addproduct';
import Adminpannel from './Components/Adminpannel';
import Bill from './Components/Bill';
import Cardpay from './Components/Cardpay';
import Cashpay from './Components/Cashpay';
import Deleteproduct from './Components/Deleteproduct';
import Footer from './Components/Footer';
import Forgotpsw from './Components/Forgotpsw';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Payment from './Components/Payment';
import Product from './Components/Product';
import Productdetails from './Components/Productdetails';
import Register from './Components/Register';
import Report from './Components/Report';
import Updateproduct from './Components/Updateproduct';
import AdminHome from './Components/AdminHome';


function App() {
  return (
    <div>
      <Router>
       
      <Navbar/>
      <Adminpannel/>
       <Routes>
       <Route  path='/' element={<Home />}></Route>
       <Route  path='/home' element={<Home />}></Route>
       <Route  path='/Products' element={<Product/>}></Route>
       <Route  path='/about' element={<About />}></Route>
       <Route  path='/login' element={<Login/>}></Route>
       <Route  path='/Register' element={<Register/>}></Route>
       <Route  path='/forgotpsw' element={<Forgotpsw/>}></Route>
       <Route  path='/reset' element={<Forgotpsw/>}></Route>
       <Route  path='/bill' element={<Bill/>}></Route>
       <Route  path='/cashpay' element={<Cashpay/>}></Route>
       <Route  path='/cardpay' element={<Cardpay/>}></Route>
       <Route  path='/payments' element={<Payment/>}></Route>
       <Route  path='/productdetails' element={<Productdetails/>}></Route>
       <Route  path='/addproducts' element={<Addproduct/>}></Route>
       <Route  path='/deleteProducts' element={<Deleteproduct/>}></Route>
       <Route  path='/updateProducts' element={<Updateproduct/>}></Route>
       <Route  path='/Reports' element={<Report/>}></Route>
       <Route  path='/Adminhome' element={<AdminHome/>}></Route>
      
      


       </Routes>

    <Footer></Footer>
      </Router>

     
    </div>
  );
}

export default App;

