
import React from "react";
import { Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

function About() {
    return (

      <div style={{position: 'relative'}}className="h-100 gradient-custom">
      
      <h1
        id="section1"
        style={{
          position: 'absolute',
          left: 870,
          top: '10%',
          color: 'whitesmoke',
          fontFamily: 'fantasy',
        }}
      >
        Visit Our Facebook ​pages for see some ​other Valuable Items


      </h1>
      <h5 id="section1"
        style={{
          position: 'absolute',
          left: 980,
          top: '25%',
          color: 'whitesmoke',
          fontFamily: 'fantasy',
        }}
      >

     Find us on Facebook
      </h5>
    

      <a href="https://www.facebook.com/SiriLakaCarvings" target="_blank" rel="noopener noreferrer">
          <Button
        variant="primary"
        style={{
          background: '#371562',
          position: 'absolute',
          borderBlockColor:'white',
          outline:'white',
          left: 990,
          color:'white',
          top: '35%',
          transform: 'translateY(-50%)',
          width: '160px',
          height: '50px',
          fontSize: '15px',
        }}
       
      >
        Facebook
      </Button>
      </a>


    <img
        src="https://i.ibb.co/dry4Lhy/Screenshot-2024-02-06-134147.png"
        className="img-fluid"
        alt="Wild Landscape"
        style={{ width: '50%',paddingLeft:'80px' }}
      />
      <br></br><br></br><br></br>

      <Container>
      <Row>
        <Col>  <img
         src="https://i.ibb.co/2h3qTw0/v5u00i91.png"
         style={{width:"500px"}}>
    
        </img>
       </Col>
        <Col style={{color:'white',fontSize:'23px'}}><br></br><br></br>"Your kindness knows no bounds! As 
        a ​compassionate customer, you're ​making a significant impact by ​extending your support to those in ​need 
        in remote villages across the ​country. Your generosity is a beacon of ​hope, 
        reaching the hearts of the ​helpless and making a lasting ​difference in their lives."<br></br><br></br><br></br>
       </Col>
      </Row>
    
    </Container>
    <div style={{paddingTop:'100px'}}>

    </div>

   

      


  

      </div>
    );
  }
  

  export default About;