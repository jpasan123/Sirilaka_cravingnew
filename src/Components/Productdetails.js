
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import {
  MDBBtn,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBRow
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { auth, firestore } from '../firebase';

function Productdetails() {

  const [product,setProduct]=useState([]);
  const [proid,setProid]=useState('');
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('productId');
    setProid(id);

  }, [location.search]);


  useEffect (()=>{
    const fetchproductbyid= async () => {
    
  
        try {
         
          const productCollection = collection(firestore, 'products');
    
          const q = query(productCollection,where('__name__', '==', proid));
    
          const querySnapshot = await getDocs(q);
    
          const products = [];
          querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
          });
        
          setProduct(products);
  
        } catch (error) {
          console.error('Error fetching user comments: ', error.message);
        }
   
    };

    fetchproductbyid();
  })


 

  const addProduct = async (newProductId) => { // Pass `user` and `newProductId` as parameters
    try {
      if (!user || !user.uid) {
        throw new Error('User is not authenticated or does not have UID');
      }
  
      // Get a reference to the user document you want to update
      const userDocRef = doc(firestore, 'customers', user.uid);
  
      // Retrieve the user document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User document does not exist');
      }
  
      // Get the current products array from the user document data
      const userData = userDoc.data();
      const currentProducts = userData.products || [];
  
      // Check if the newProductId is already in the products array
      if (!currentProducts.includes(newProductId)) {
        // Add the newProductId to the products array
        const updatedProducts = [...currentProducts, newProductId];
  
        // Update the user document with the new products array
        await updateDoc(userDocRef, { products: updatedProducts });
  
        console.log('Product added successfully');
      } else {
        console.log('Product already exists in the user document');
      }
  
    } catch (error) {
      console.error('Error adding product: ', error.message);
    }
  };
  
 
  
    return (
      <div className="h-100 gradient-custom" >

        <Container>
        {product.map(product => (
       <MDBContainer fluid><br></br><br></br><br></br>
     
      <MDBRow className="justify-content-center mb-0">
      <MDBCol md="8" className="ps-md-5">  
  
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image rounded hover-zoom hover-overlay">
            <MDBCardImage
              src={product.image}
              fluid
              className="w-100"
            />
            <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              />
            </a>
          </MDBRipple>
       
        </MDBCol><br></br>
        <MDBCol md="4" className="pe-md-5">
          <h5 style={{color:'white'}}>Wood Elephant</h5>
          <div className="d-flex flex-row">
            <div className="text-danger mb-1 me-2">
              <MDBIcon fas icon="star" />
              <MDBIcon fas icon="star" />
              <MDBIcon fas icon="star" />
              <MDBIcon fas icon="star" />
            </div>
            <span style={{color:'white'}}>310</span>
          </div>
          <div className="mt-1 mb-0 text-muted small" style={{color:'white'}}>
            <span style={{color:'white'}}>100% cotton</span>
            <span className="text-primary"> • </span>
            <span style={{color:'white'}}>Light weight</span>
            <span className="text-primary"> • </span>
            <span style={{color:'white'}}>
              Best finish
              <br />
            </span>
          </div>
          <div className="mb-2 text-muted small">
            <span style={{color:'white'}}>Unique design</span>
            <span className="text-primary"> • </span>
            <span style={{color:'white'}}>For men</span>
            <span className="text-primary"> • </span>
            <span style={{color:'white'}}>
              Casual
              <br />
            </span>
          </div>
          <p  style={{color:'white'}}>
          {product.description}
          </p>
          <br></br>
          <div className="d-flex flex-row align-items-center mb-1">
            <h4 className="mb-1 me-1" style={{color:'white'}}>Rs{product.price}</h4>
            <span className="text-danger">
              <s>Rs.2000.99</s>
            </span>
          </div>
          <h6 style={{color:'AppWorkspace'}}>Free shipping</h6>
          <div className="d-flex flex-column mt-4">
            <Link to='/payments'><MDBBtn style={{backgroundColor:'#371562',width:'200px'}} size="sm">
              Buy
            </MDBBtn></Link>
            <Link to={{
                  pathname:"/payments",
                  search:`?productId=${product.id}`
                }}>
            <MDBBtn outline color="black" size="sm" className="mt-2" style={{width:'200px'}} onClick={addProduct(proid)}>
              Add to cart
            </MDBBtn></Link>
          </div>
          
        </MDBCol>
       
      </MDBRow><br></br>
      
    </MDBContainer>
   ))}
    </Container><br></br><br></br><br></br>
      </div>
    );
  }
  
  export default Productdetails;

