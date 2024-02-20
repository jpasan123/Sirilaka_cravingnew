
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, firestore } from "../firebase";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null); // State to track registration status

    const handleLogin = async () => {

      if(password!==confirmpassword){

        alert('error');
        return;
      }
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
           
            if(selectedCategory!='Supplier'){
                await setDoc(doc(firestore, 'customers',user.uid), {
              
                    username: username, // Save username if collected
                    email: email,
                    createdAt:serverTimestamp()
                  
                    
                    // Add other user data as needed
                });


            }

            else{

                await setDoc(doc(firestore, 'suppliers' ,user.uid), {
              
                    username: username, // Save username if collected
                    email: email,
                    createdAt:serverTimestamp()
                  
                    
                    // Add other user data as needed
                });
            }
            
          
            
            setRegistrationStatus('success');
            console.log("User successfully created and data added to Firestore!");
        } catch (error) {
            console.error("Error creating user or adding document: ", error.message);
            // Handle errors, display appropriate messages to the user
        }
    };

    return (
        <div className="h-100 gradient-custom">
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://i.ibb.co/wKpQFgR/bwsx7i3h.png" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>


                            <Form.Select size="lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                      <option>Select user type</option>
                                    
                                    <option key='Supplier'>Supplier</option>
                                    <option key='Customer'>Customer</option>
                              
                                   </Form.Select>
                                   <br></br>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Username' // Change label to Username
                                    id='formControlLg'
                                    type='text' // Change type to text
                                    size="lg"
                                    name="username" // Change name to username
                                    style={{ backgroundColor: 'white' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} required />

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='formControlLg'
                                    type='email'
                                    size="lg"
                                    name="email"
                                    style={{ backgroundColor: 'white' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} required />

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='formControlLg'
                                    type='password'
                                    size="lg"
                                    name="password"
                                    style={{ backgroundColor: 'white' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />

                                 <MDBInput
                                    wrapperClass='mb-4'
                                    label='ConfirmPassword'
                                    id='formControlLg'
                                    type='ConfirmPassword'
                                    size="lg"
                                    name="address"
                                    style={{ backgroundColor: 'white' }}
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)} required />

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3" style={{ color: 'white' }}>
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={handleLogin}
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#371562' }}>Register
                                         {registrationStatus === 'success' && (
                <div className="alert alert-success" role="alert">
                    Registration Successful!
                </div>
            )}
            {registrationStatus === 'error' && (
                <div className="alert alert-danger" role="alert">
                    Error registering. Please try again.
                </div>
            )}</button>

                                    <Link to='/login'>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg"
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', marginLeft: '20px', backgroundColor: '#371562' }}>Back to Login</button>
                                    </Link>
                                    <br /><br />
                                    <Link to='/forgotpsw'><a style={{ color: 'white' }}>Forgot password?</a></Link>
                                    <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: 'white' }}>
                                        Don't have an account?
                                        <a href="#!" className="link-danger">Register</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default Register;
