import { sendPasswordResetEmail } from 'firebase/auth';
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';

function Forgotpsw() {


    
   
  
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    newPassword: '',
  });

  const history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

   
  };

  const handlePasswordReset = async () => {
  console.log('ok')
    try {
     
      if(!formData.email){
        console.log('unsuccessful');
  
      }

      else{
      await sendPasswordResetEmail(auth, formData.email);


    
    }
    
  }   catch (error) {

      console.error('Password reset error:', error.message);

      
    }
  };



  
   
  
   
  
  
    return (
        <div className="h-100 gradient-custom" >
      
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://i.ibb.co/wKpQFgR/bwsx7i3h.png"
                className="img-fluid" alt="Sample image"></img>
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
                style={{backgroundColor:'white'}}
                value={formData.email}
                onChange={handleInputChange}required />

               



                <div className="d-flex justify-content-between align-items-center">

                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3" style={{color:'white'}}>
                      Remember me
                    </label>
                  </div>
                
                </div>
                  
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" 
                   onClick={handlePasswordReset}

                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem',backgroundColor:'#371562'}}>
                      Send Link
                    </button>
         
                     <br></br><br></br>
                     <Link to='/forgotpsw'><a style={{color:'white'}}>Forgotpassword?</a></Link>
                  <p className="small fw-bold mt-2 pt-1 mb-0" style={{color:'white'}}>Don't have an account? 
                  <Link to='/Register'><a href="#!"
                    className="link-danger">Register</a></Link></p>
                    
                </div>

             </form>
            </div>
          </div>
        </div>
        
      </section>
    </div>
    );
  }
  
  export default Forgotpsw;