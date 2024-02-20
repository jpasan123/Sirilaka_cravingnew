

import { Input, initMDB } from "mdb-ui-kit";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import CategoryService from "../Services/category_service";
import ProductService from "../Services/product_service";
import "./styles.css";
import { DateRangePicker } from 'rsuite';
import './rsuite-default.css'; /* Adjust the path as needed */
import InvoiceService from "../Services/invoice_service";




export default function Report() {
  const [totalSales, setTotalSales] = useState(0);
  const [categories, setCategories] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [showYearCalendar, setShowYearCalendar] = useState(false);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateRangeChange = (value) => {
    if (value && value.length === 2) {
      const [start, end] = value;
      setStartDate(start);
      setEndDate(end);
    }
  };


  useEffect(() => {

    const fetchCategories = async () => {
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();

  }, []);
  const fetchSalesData = async () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates.');
      return;
    }

    try {
      const { totalSales, productSales } = await InvoiceService.getSalesReport(startDate, endDate);
      const salesArray = Object.entries(productSales).map(([id, product]) => ({
        productId: product.productId,
        productName: product.productName,
        description: product.productdescription,
        category: product.productcategory,
        price: product.salesAmount
      }));
      setSalesData(salesArray);
      setTotalSales(totalSales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div className="Align">
      <Container style={{ paddingTop: "40px" }}>
        <Row>
          <Col sm={2}></Col>
          <Container>
            <Row>
              <Col sm={2}></Col>
              <Col sm={5}>
                <div className="dates">
                  <h1>Sales Report</h1>
                  <br></br>
                  <DateRangePicker
                    size="lg"
                    placeholder="Select Year"
                    style={{ width: 224 }}
                    onChange={handleDateRangeChange}
                    classPrefix="rs-"
                    className="date-range-picker"
                    onOpen={() => setShowYearCalendar(true)}
                    onClose={() => setShowYearCalendar(false)}
                    open={showYearCalendar}
                  />
                  <br></br>
                </div>

                <br></br>
                <br></br>

                <Button
                  variant="primary"
                  style={{
                    background: "#371562",
                    position: "absolute",
                    color: "white",
                    transform: "translateY(-50%)",
                    width: "160px",
                    height: "50px",
                    fontSize: "15px",
                  }}
                  onClick={fetchSalesData}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>

          <Col sm={2}></Col>
          <Col sm={10}>
            <br></br>
            <br></br>
            <br></br>
            <Table responsive="xl">
              <thead>
                <tr>
                  <th className="fs-5">Product Name</th>
                  <th className="fs-5">Description</th>
                  <th className="fs-5">Category</th> 
                  <th className="fs-5">quantity</th> 
                  <th className="fs-5">Price</th>
                </tr>
              </thead>
              <tbody>
               
                  <tr >
                    <td className="fs-5">Wood Elepahnt </td>
                    <td className="fs-5">Traditonal Wood Elephant in Srilanka</td>
                    <td className="fs-5">logo</td>
                    <td className="fs-5">12</td>
                    <td className="fs-5">Rs.180000</td>
                  </tr>
                  <tr >
                    <td className="fs-5">Gurule Mask </td>
                    <td className="fs-5">Traditonal Gurule Mask in Srilanka</td>
                    <td className="fs-5">Mask</td>
                    <td className="fs-5">8</td>
                    <td className="fs-5">Rs.200000</td>
                  </tr>
                  <tr >
                    <td className="fs-5">kadaldoru mask </td>
                    <td className="fs-5">Traditonal Kadaldoru Mask in Srilanka</td>
                    <td className="fs-5">Mask</td>
                    <td className="fs-5">5</td>
                    <td className="fs-5">Rs.150000</td>
                  </tr>
                  <tr >
                    <td className="fs-5">Wood Shield</td>
                    <td className="fs-5">Traditonal Wood Shield in Srilanka</td>
                    <td className="fs-5">Mask</td>
                    <td className="fs-5">3</td>
                    <td className="fs-5">Rs.84000</td>
                  </tr>
                  <tr >
                    <td className="fs-5">Buddha Status</td>
                    <td className="fs-5">Traditonal Buddha Status in Srilanka</td>
                    <td className="fs-5">Mask</td>
                    <td className="fs-5">6</td>
                    <td className="fs-5">Rs.180000</td>
                  </tr>
                
              </tbody>
            </Table>
          </Col>
        
        </Row>
        <div style={{paddingLeft : "130px", display : "flex" ,fontSize : "22px"}}>
          <span>Total Sales(Rs): 794,000 </span>
        </div>
      </Container>

    </div>
  );

}

