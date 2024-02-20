
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
function Home() {
    
    return (
      <div style={{position: 'relative'}}className="h-100 gradient-custom">
      
      <h1
        id="section1"
        style={{
          position: 'absolute',
          left: 720,
          top: '10%',
          color: 'whitesmoke',
          fontFamily: 'fantasy',
        }}
      >
        Welcome to Srilaka Cravings
      </h1>
      <h5 id="section1"
        style={{
          position: 'absolute',
          left: 800,
          top: '25%',
          color: 'whitesmoke',
          fontFamily: 'fantasy',
        }}
      >

      You Are Customer or Supplier
      </h5>
     <Link to="/login"><Button
        variant="primary"
        style={{
          background: '#371562',
          position: 'absolute',
          color:'white',
          left: 930,
          top: '35%',
          transform: 'translateY(-50%)',
          width: '160px',
          height: '50px',
          fontSize: '15px',
        }}
        
      >
       Supplier
      </Button></Link> 

      <Link to="/login"><Button
        variant="primary"
        style={{
          background:'#371562',
          position: 'absolute',
          left: 750,
          color:'white',
          top: '35%',
          transform: 'translateY(-50%)',
          width: '160px',
          height: '50px',
          fontSize: '15px',
        }}
       
      >
        Customer
      </Button></Link> 


    <img
        src="https://i.ibb.co/dry4Lhy/Screenshot-2024-02-06-134147.png"
        className="img-fluid"
        alt="Wild Landscape"
        style={{ width: '50%',paddingLeft:'80px' }}
      />
      <br></br><br></br><br></br>

      <Container>
      <Row>
        <Col><Fade right><img
         src="https://i.ibb.co/d0Jw6Vz/qh2sp3ed.png"
         style={{width:"500px"}}>
    
        </img></Fade>
       </Col>
        <Col style={{color:'white',fontSize:'23px'}}><br></br><br></br>Most people experience food cravings from time to time. These cravings can cause them 
        to snack on unhealthful foods, which can lead to weight gain.Most people experience food cravings from time to time. These cravings can cause them 
        to snack on unhealthful foods, which can lead to weight gain.<br></br><br></br><br></br>
        <Link to='/Products'><Button
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
        Go to shop
      </Button></Link></Col>
      </Row>
    
    </Container>
    <div style={{paddingTop:'100px'}}>

    </div>

   

      


  

      </div>
    );
  }

export default Home;