// Adminpannel.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, useLocation } from 'react-router-dom';


export default function Adminpannel() {
    
  
    const [shouldRedirect, setShouldRedirect] = useState(true);
  
   
    const location = useLocation();
  
 
  
   
  
  
   if(location.pathname==="/home" || location.pathname=="/about"  || location.pathname=="/Register" || location.pathname=="/" || location.pathname=="/login"
   || location.pathname=="/forgotpsw" || location.pathname=="/bill" || location.pathname=="/cardpay"  || location.pathname=="/payments" ||
    location.pathname=="/Products" || location.pathname=="/productdetails"){
  
    return null;
   }
  
  
  
    const handleLinkClick = () => {
      // Stop the redirection by setting shouldRedirect to false
      setShouldRedirect(false);
    };
  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-2 sidebar" style={{ minHeight: '100vh',backgroundColor:'#6814cc' }}>
          <br />
          <Container>
            <Row>
           <Link to="/home"> <Button
          variant="primary"
          style={{
            background: '#371562',
            position: 'absolute',
     
            color:'white',
        
            transform: 'translateY(-50%)',
            width: '160px',
            height: '50px',
            fontSize: '15px',
          }}
         
        >
         MAIN Page
        </Button></Link><br></br>
              <Col md={4}><br></br><br></br>
                <img
                  className='cart'
                  src="https://i.ibb.co/ZShJMsd/R-2.png"
                  alt="Shopping Cart"
                  style={{ width: '50px' }}
                />
              </Col>
              <Col md={{ span: 7, offset: 0 }}>
                <h5 style={{ color: 'whitesmoke' }}> </h5>
              </Col>
            </Row>
          </Container>
          <br />
            
          <Link to="/Adminhome" className="sidenav-link" style={{ fontSize: '20px', marginLeft: '20px' }}  onClick={handleLinkClick}>
          Home
          </Link>
          <Link to="/addProducts" className="sidenav-link" style={{ fontSize: '20px', marginLeft: '20px' }}  onClick={handleLinkClick}>
            Add Products
          </Link>

        

          <Link to="/updateProducts" className="sidenav-link" style={{ fontSize: '20px', marginLeft: '20px' }}  onClick={handleLinkClick}>
           Update Products
          </Link>

          <Link to="/deleteProducts" className="sidenav-link" style={{ fontSize: '20px', marginLeft: '20px' }}  onClick={handleLinkClick}>
          Delete Products
          </Link>

          <Link to="/Reports" className="sidenav-link" style={{ fontSize: '20px', marginLeft: '20px' }}  onClick={handleLinkClick}>
            Reports
          </Link>



        
        </div>
        <div className="col-md-9 content">
          {/* The content of the page */}
        </div>
      </div>
    </div>
  );
}
