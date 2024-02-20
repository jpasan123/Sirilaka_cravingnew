import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, firestore } from "../firebase";
import './styles.css';

function Payment() {

  const location = useLocation();
 
  const [user, setUser] = useState();
  const [product,setProduct]=useState([]);
  const [proid,setProid]=useState('');
  const [totalPrice, setTotalPrice] = useState(0); // Total price state
  const [quantities, setQuantities] = useState({}); // State to manage quantities of products
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');


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


  useEffect(() => {
    const fetchProductsByUserId = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('User is not authenticated or does not have UID');
        }

        // Get a reference to the user document
        const userDocRef = doc(firestore, 'customers', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          throw new Error('User document does not exist');
        }

        const userData = userDocSnapshot.data();

        // Check if the user has a 'products' array field
        if (!userData.products || !Array.isArray(userData.products)) {
          throw new Error('User does not have products or products field is not an array');
        }

        // Fetch products based on the product IDs stored in the 'products' array
        const productsData = [];
        const initialQuantities = {};
        let total = 0;
        for (const productId of userData.products) {
          const productDocRef = doc(firestore, 'products', productId);
          const productDocSnapshot = await getDoc(productDocRef);
          if (productDocSnapshot.exists()) {
            const productData = { id: productId, ...productDocSnapshot.data() };
            productsData.push(productData);
            initialQuantities[productId] = 1; // Set initial quantity to 1 for each product
            total += productData.price;
          }
        }

        setProduct(productsData);
        setQuantities(initialQuantities); // Set initial quantities
        setTotalPrice(total);
      
      } catch (error) {
        console.error('Error fetching products: ', error.message);
      }
    };

    fetchProductsByUserId();
  }, [user]);
 
  const calculateTotalPrice = () => {
    let total = 0;
    product.forEach(product => {
      const quantity = quantities[product.id] || 0;
      total += quantity * product.price;
    });
    return total;
  };

  const deleteProduct = async (productIdToDelete) => {
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
  
      // Remove the productIdToDelete from the products array
      const updatedProducts = currentProducts.filter(productId => productId !== productIdToDelete);
  
      // Update the user document with the new products array
      await updateDoc(userDocRef, { products: updatedProducts });
  
      console.log('Product deleted successfully from user document');
    } catch (error) {
      console.error('Error deleting product: ', error.message);
    }
  };
  
  const updateQuantity = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity >= 0 ? quantity : 0 // Ensure quantity is non-negative
    }));
  };
  
  const increaseQuantity = (productId) => {
    updateQuantity(productId, (quantities[productId] || 0) + 1);
  };
  
  const decreaseQuantity = (productId) => {
    updateQuantity(productId, (quantities[productId] || 0) - 1);
  };
  

  const getProductPrice = (productId) => {
    const productData = product.find(p => p.id === productId);
    return productData ? productData.price : 0;
  };



 

  const addOrder = async (orderData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'orders'), orderData);
      console.log('Document added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    try {
      // Check if there are products
      if (product.length === 0) {
        throw new Error('No products in the cart');
      }
  
      // Create invoice data
      const invoiceData = {
        products: product.map(item => ({
       
          name: item.name,
          quantity: quantities[item.id] || 0,
          price: item.price,
          subtotal: (quantities[item.id] || 0) * item.price
        })),
        total: totalPrice,
        user:user.uid,
        address: address,
        email: user.email,
        phone: phone,
        name: name,
        date: serverTimestamp() // Use Firestore server timestamp for the date
      };
  
      // Add the invoice data to Firestore
      const querySnapshot = await getDocs(query(collection(firestore, 'invoice'), where('user', '==', invoiceData.user)));
    const existingDoc = querySnapshot.docs[0];

    if (existingDoc) {
      // Update the existing invoice document
      const invoiceRef = doc(firestore, 'invoice', existingDoc.id);
      await setDoc(invoiceRef, invoiceData, { merge: true });
      console.log('Invoice updated successfully');
    } else {
      // Add a new invoice document
      const docRef = await addDoc(collection(firestore, 'invoice'), invoiceData);
      console.log('Invoice added with ID:', docRef.id);
    }
  } catch (error) {
    console.error('Error adding or updating invoice:', error.message);
  }


  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form data
    const formData = {
      address: address,
      email: email,
      phone: phone,
      name: name
    };
    // Add the order to the "orders" collection
    addOrder(formData);
    // Optionally, clear form fields after submission
    setAddress('');
    setEmail('');
    setPhone('');
    setName('');
  };





  return (
    <div style={{backgroundColor:'#371562'}}>
   
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - 2 items</h5>
                </div>
                <div className="card-body">
                {product.map(product => (
                 <div className="row" key={product.id}>
                 <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                   <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                     <img src={product.image} className="w-100" alt="Blue Jeans Jacket" />
                     <a href="#!">
                       <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                     </a>
                   </div>
                 
                      {/* Image */}
                    </div>
                   
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      {/* Data */}
                      <p><strong>{product.name}</strong></p>
                      <p>Color: blue</p>
                      <p>Size: M</p>
                      <div className="d-flex align-items-center">
                      <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={()=>deleteProduct(product.id)}>  
                        <i className="fas fa-trash"></i> 
                      </button>
                      <input type="number" className="form-control form-control-sm text-center me-1 mb-2"
                            value={quantities[product.id]} readOnly /> 
                      <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list"  onClick={() => decreaseQuantity(product.id)} >
                        <i className="fas fa-heart"></i>
                      </button>
                      {/* Data */}
                    </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <p><strong>{product.name}</strong></p>
                        <p>Color: blue</p>
                        <p>Size: M</p>
                      {/* Quantity */}
                      <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                        <button type="button" className="btn btn-primary px-3 me-2"  onClick={() => decreaseQuantity(product.id)}>
                          <i className="fas fa-minus"></i>
                        </button>
                        <input type="number" className="form-control form-control-sm text-center me-1 mb-2"
                            value={quantities[product.id] || 0 } onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))} /> {/* Quantity input field */}
                          <button type="button" className="btn btn-primary btn-sm mb-2"
                            onClick={() => increaseQuantity(product.id)}> {/* Increase quantity button */}
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <p className="text-start text-md-center"><strong>RS.{getProductPrice(product.id)}</strong></p>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4" />

                  
                  
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    
                    </div>

                  

                  
                  </div>
                  {/* Single item */}
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                <p><strong>Total:{calculateTotalPrice()}</strong></p>
                  <p>Expected shipping delivery</p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </div>
              </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <p><strong>We accept</strong></p>
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                  <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                  <img className="me-2" width="45px" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png" alt="PayPal acceptance mark" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
            <div className="card mb-4">
  <div className="card-header py-3">
    <h5 className="mb-0">Delivery Details</h5>
    </div>
<form onSubmit={handleSubmit}>
  <div className="card-body">
    <div className="mb-3">
      <label htmlFor="address" className="form-label">Address:</label>
      <input 
          type="text" 
          className="form-control" 
          id="address" 
          placeholder="Enter your address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} // Update address state on input change
        />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input 
          type="email" 
          className="form-control" 
          id="email" 
          placeholder="Enter your email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone:</label>
      <input 
          type="tel" 
          className="form-control" 
          id="phone" 
          placeholder="Enter your phone number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} // Update phone state on input change
        />
    </div>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>

      <input 
          type="text" 
          className="form-control" 
          id="name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Update name state on input change
        />

    </div>
    <div className="mb-3">
      <label htmlFor="locationMap" className="form-label">Location Map:</label>
      {/* Embed Google Map using iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.002209546996!2d-73.98566418459475!3d40.74881797932639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDIzJzE4LjEiTiA3M8KwNTInMTkuOCJX!5e0!3m2!1sen!2sus!4v1644169962685!5m2!1sen!2sus"
        width="100%"
        height="200"
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
    <button type="submit" style={{backgroundColor:"#371562",color:'white',borderRadius:'8px'}}>
                    Submit To Data
                  </button> 
      </div>
    </form>            
     </div>
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>$53.98</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span><strong>$53.98</strong></span>
                    </li>
                  </ul>
                  

                 <Link to="/cardpay"> <button style={{backgroundColor:"#371562",color:'white',borderRadius:'8px'}}>
                    Card Payment
                  </button >
                  </Link>
                  <Link to= {{
                  pathname:"/bill",

                }}>
                 <button 
                 style={{backgroundColor:"#371562",color:'white',borderRadius:'8px',marginLeft:"20px"}}  
                 // Pass reference to the function, don't invoke it
                        >
                     Cash on Delivery  
                        </button>
                        </Link>
                </div>
              </div>
            </div>
    
          </div>
      
      </section>
   
    </div>
  );
}

export default Payment;
