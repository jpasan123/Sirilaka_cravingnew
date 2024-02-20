import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import ProductService from '../Services/product_service';

function Product() {
  const [products, setProducts] = useState([]);

 

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();

  }, []);
  

  return (
    <div className="h-100 gradient-custom" ><br></br>
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/5FQRMwS/photo-1.png"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/KbRk3mt/Photo-2.png"
              alt="Second slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.ibb.co/VMjrDPz/Neutral-Brown-White-Minimal-Aesthetic-Furniture-Online-Promotion-Facebook-Cover.png" 
              alt="Third slide"
              style={{ maxHeight: "500px", objectFit: "cover" }} // adjust styles as needed
            />
            <Carousel.Caption>
              <h3 style={{ fontWeight: "5px" }}></h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel></Container><br></br><br></br>

      <Container>
        <h1 style={{ color: 'white' }}>Rare Type ​Products</h1>
        <br></br><br></br>
        <Row>
          <Col sm={8} style={{ color: 'white', fontSize: '22px', paddingTop: '50px' }}>Life time warranty

            Island Wide Delivery

            High Quality Branded items

            Made in Sri Lanka Oval Vector Stamp
            Products From Middle Of the ​country<br></br><br></br>
            <img src="https://i.ibb.co/RTYByVb/exfx6eiy.png"
              width={'300px'}></img></Col>

          <Col><img src="https://i.ibb.co/CbCVsgB/xg4dfyia.png"
            width={'300px'}></img></Col>
        </Row>

      </Container>
      <br></br><br></br>
      <Container>
        <Row>
          {products.map(product => (
            <Col>   <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image}/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.price}
                </Card.Text>
                <Link to={{
                  pathname:"/productdetails",
                  search:`?productId=${product.id}`
                }}>
                  <Button style={{ backgroundColor: '#371562' }} >Buy</Button></Link>
               <Button style={{ marginLeft: '30px', backgroundColor: '#371562' }}>Add to cart</Button>
              </Card.Body>
            </Card></Col>
          ))}
        </Row>
      </Container><br></br><br></br><br></br>

    </div>
  );
}


export default Product;