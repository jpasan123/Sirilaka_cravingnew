

import { MDBInput, MDBFile } from 'mdb-react-ui-kit';
import { Input, initMDB } from "mdb-ui-kit";
import React, { useState, useEffect } from 'react';
import { Button, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import CategoryService from "../Services/category_service";
import ProductService from '../Services/product_service';
import { auth,firestore } from '../firebase';
import { doc,deleteDoc } from 'firebase/firestore';
import Product from '../Models/product';

initMDB({ Input });

export default function Deleteproduct() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();

    const fetchProducts = async () => {
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);


  
  const handleDelete = async (productId) => {
    try {
      // Construct the reference to the document
      const productRef = doc(firestore, 'products', productId);
  
      // Delete the document
      await deleteDoc(productRef);
  
      console.log('Document deleted successfully:', productId);
    } catch (error) {
      console.error('Error deleting document:', error);
      // Handle errors
    }
  };
  

  
  return (
    <div className="Align">
      <Container style={{ paddingTop: '40px' }}>
        <Row>
          <Col sm={2}></Col>
          <Container>
            <Row>
              <Col sm={2}></Col>
              <Col sm={5}>
               

              </Col>
            </Row>
          </Container>

          <Col sm={2}></Col>
          <Col sm={10}>
            <br></br><br></br>
            <br></br><br></br>
            <Table responsive="xl">
              <thead>
                <tr>
                  <th className="fs-5">Name</th>
                  <th className="fs-5">Description</th>
                  <th className="fs-5">Category</th>
                  <th className="fs-5">qty</th>
                  <th className="fs-5">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="fs-5">{product.name}</td>
                    <td className="fs-5">{product.description}</td>
                    <td className="fs-5">{product.category}</td>
                    <td className="fs-5">{product.qty}</td>
                    <td className="fs-5">{product.price}</td> 
                  
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.id)}
                      style={{ marginLeft: '1px', marginTop: '30px', backgroundColor: '#dc7284' }}>
                      Delete
                    </Button>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

