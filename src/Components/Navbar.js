

import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { useLocation, Link } from "react-router-dom";
import './styles.css';
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";


function Navbar() {

const [openNavCentred, setOpenNavCentred] = useState(false);
const location = useLocation();
const [isLoggedIn, setIsLoggedIn] = useState(false);
  
 
  
   
  
  
if(location.pathname==="/addProducts" ||location.pathname==="/addproducts"  || location.pathname=="/deleteProducts"  || location.pathname=="/updateProducts" || location.pathname=="/Reports"
|| location.pathname=="/Adminhome"){

 return null;
}
const handleLogout = async () => {
  try {
      await signOut(auth); // Sign out the user
      setIsLoggedIn(false); // Update state to indicate user is logged out
      console.log("User successfully logged out!");
      // Redirect or perform other actions upon successful logout
  } catch (error) {
      console.error("Error signing out: ", error.message);
      // Handle logout errors
  }
};


    return (

      <div className="h-100 gradient-custom" >
      <center><Nav className="justify-content-center" style={{ backgroundColor:'#f7931e', borderRadius:'10px',maxWidth: '90%' }}>
      <Nav.Item>
        <Nav.Link href="/home" style={{ color:'white' }} className='Links'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Products" style={{ color:'white' }} className='Links'>Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about" style={{ color:'white' }} className='Links'>About</Nav.Link>
      </Nav.Item>
      <Nav.Item style={{ marginLeft:'auto', marginRight:'auto' }}> {/* Middle alignment */}
        <input type="text" placeholder="Search..." style={{ marginRight: '10px', width: '200px', height: '30px' ,borderRadius:"6px",marginTop:'4px',marginLeft:'40px'}} />
        <button style={{ backgroundColor:'#371562', color: 'white', border: 'none', borderRadius: '5px', height: '30px' }}>Search</button>
      </Nav.Item>
      <Nav.Item style={{ marginLeft: 'auto' }}>
  <a href='/payments'>
    <img
      className='cart'
      src="https://i.ibb.co/sRD1hnq/R.png"
      alt="Shopping Cart"
      style={{ marginRight: '20px', width: '40px' }} // Adjust margin as needed
    />
  </a>
</Nav.Item>
      <Dropdown as={ButtonGroup} style={{ paddingLeft:'5px' }}>
        
        <Button style={{ backgroundColor:'#371562' }}>User Account</Button>
        <Dropdown.Toggle split id="dropdown-split-basic" style={{ backgroundColor:'#371562' }} />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={handleLogout}>Logout</Dropdown.Item>
          <Link to="/login"><Dropdown.Item href="#/action-2">Login</Dropdown.Item></Link>
          <Dropdown.Item href="/addproducts">Admin Panel</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav></center> 
      </div>
    );
  }
  

  export default Navbar;