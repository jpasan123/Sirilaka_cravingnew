
import {
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

import React from "react";

export default function Foot(){

  
  const location = useLocation();

  if(location.pathname==="/deleteProducts"  || location.pathname==="/addProducts" || location.pathname==="/addproducts" ||location.pathname==="/updateProducts"
|| location.pathname==="/Reports"){

    return null;
   }


    return(
   <div>

<MDBFooter className='text-center' color='white' style={{backgroundColor:'#371562'}}>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1'>
         < a href="https://www.facebook.com/SiriLakaCarvings" target="_blank" rel="noopener noreferrer">
            <MDBIcon fab icon='facebook-f' />
            </a>
           </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/DevTech-Nexus' role='button' target='_blank'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

        <section className='mb-4'>
          <p>
           type 
          </p>
        </section>

        <section className=''>
 
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © DevTech-Nexus 2023
        <a className='text-white' href='https://mdbootstrap.com/'>
        </a>
      </div>
    </MDBFooter>

</div>

    );
    
}

