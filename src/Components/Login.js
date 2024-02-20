
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
  
            <Link to="/home"></Link>
            console.log("User successfully logged in!");
           
            // Redirect or perform other actions upon successful login
        } catch (error) {
            console.error("Error signing in: ", error.message);
            // Handle login errors
        }
    };
    const handleReset =()=>{
        
    }

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
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Email'
                                    id='formControlLg'
                                    type='email'
                                    size="lg"
                                    name="email"
                                    style={{ backgroundColor: 'white' }}
                                    value={email}
                                    onChange={handleEmailChange} required />

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    id='formControlLg'
                                    type='password'
                                    size="lg"
                                    name="password"
                                    style={{ backgroundColor: 'white' }}
                                    value={password}
                                    onChange={handlePasswordChange} required />

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3" style={{ color: 'white' }}>
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                <Link to="/home">  <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={handleLogin}
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#371562' }}>Login</button></Link> 

                                    <br /><br />
                                    <Link to='/forgotpsw'><a style={{ color: 'white' }}>Forgot password?</a></Link>
                                    <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: 'white' }}>
                                        Don't have an account?
                                        <Link to='/Register'><a href="#!" className="link-danger">Register</a></Link>
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

export default Login;
