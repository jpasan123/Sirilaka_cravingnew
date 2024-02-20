
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
import Product from '../Models/product';
initMDB({ Input });
export default function Updateproduct() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(null);

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

  const handleUpdateClick = (product) => {
    setSelectedProductId(product.id);
    setSelectedCategory(product.category)
    setDescription(product.description)
    setProductName(product.name)
    setImageBase64(product.image);
    setPrice(product.price);
    setQty(product.qty)
  };


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productName || !description || !selectedCategory || !imageBase64 || !price) {
      alert('Please fill all fields');
      return;
    }

    try {
      var product = new Product();
      product.name = productName;
      product.id = selectedProductId;
      product.description = description;
      product.category = selectedCategory;
      product.image = imageBase64;
      product.price = parseFloat(price);
      product.qty =qty;
      await ProductService.updateProduct(product);
      const updatedProducts = await ProductService.getAllProducts();
      setProducts(updatedProducts);
      setProductName('');
      setDescription('');
      setSelectedCategory('');
      setPrice(55);
      setQty('');
      document.getElementById('userImage').value = '';
    } catch (error) {
      console.error('Error adding product: ', error);
    }
    };


  return (
    <div className="Align">

      <Container style={{ paddingTop: '40px' }}>
        <Row>
          <Col sm={2}>
          </Col>
          <Container>
            <Row>
              <Col sm={2}>
              </Col>
              <Col sm={5}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Name'
                  id='formControlLg'
                  type='Text'
                  size="lg"
                  name="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />

                <div>
                  <MDBFile label='Default file input example' id='userImage'
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />

                </div>

                <br></br>

                <MDBInput
                  wrapperClass='mb-4'
                  label='Description'
                  id='formControlLg'
                  type='Text'
                  size="lg"
                  name="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Form.Select size="lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option>Select Category</option>
                  {categories.map(category => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                   <option>Mask</option>
                  <option>Cravings</option>
                  <option>Logo</option>
                </Form.Select>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Price' // Step 3: Add input field for price
                  id='formControlLg'
                  type='number'
                  size="lg"
                  name="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                    <MDBInput
                  wrapperClass='mb-4'
                  label='Quantity' // Step 3: Add input field for price
                  id='formControlLg'
                  type='number'
                  size="lg"
                  name="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />

                <br></br><br></br><br></br>

                <Button
                  variant="primary"
                  style={{
                    background: '#371562',
                    position: 'absolute',

                    color: 'white',

                    transform: 'translateY(-50%)',
                    width: '160px',
                    height: '50px',
                    fontSize: '15px',
                  }}
                  onClick={handleUpdateProduct}>
                  Update
                </Button>

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
                  <th className="fs-5">Price</th>
                  <th className="fs-5">Quantity</th>

                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="fs-5">{product.name}</td>
                    <td className="fs-5">{product.description}</td>
                    <td className="fs-5">{product.category}</td>
                    <td className="fs-5">{product.price}</td>
                    <td className="fs-5">{product.qty}</td>
                    <Button
                      variant="success"
                      onClick={() => handleUpdateClick(product)}
                      style={{ marginLeft: '1px', marginTop: '30px', backgroundColor: '  #3b71ca' }} >

                      Update
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

