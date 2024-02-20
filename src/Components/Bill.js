import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toJpeg } from 'html-to-image';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { auth, firestore } from '../firebase';

function Bill() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('userid');
    setUser(id);
  }, [location.search]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        if (!user) return; // If user is not authenticated, exit

        // Get a reference to the invoices collection
        const invoicesCollectionRef = collection(firestore, 'invoice');

        // Create a query to fetch invoices for the current user
        const q = query(invoicesCollectionRef, where('user', '==', user.uid));

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Initialize an array to store the fetched invoices
        const invoices = [];

        // Iterate over the query snapshot to extract invoice data
        querySnapshot.forEach((doc) => {
          // Extract the data from the document
          const invoiceData = doc.data();
          // Add the invoice data to the array
          invoices.push({
            id: doc.id,
            ...invoiceData
          });
        });

        // Set the fetched invoices in the component state or handle them as needed
        setInvoiceData(invoices);
        
      } catch (error) {
        console.error('Error fetching invoices:', error.message);
        // Optionally, handle the error
      }
    };

    // Call the fetchInvoiceData function when the component mounts or when the user changes
    fetchInvoiceData();

  }, [user]); // Trigger useEffect when user changes

  const exportToJPG = async () => {
    if (!invoiceData) {
      console.error('No invoice data available');
      return;
    }



    
    const promises = invoiceData.map((invoice, index) => {
      return toJpeg(document.getElementById(`invoice-${index}`))
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.download = `invoice_${invoice.id}.jpg`;
          link.href = dataUrl;
          link.click();
        });
    });
    

    await Promise.all(promises);
  };

  return (
    <div>
      {invoiceData && invoiceData.map((invoice, index) => (
        <div key={invoice.id} className="card">
         <div className="card-body" id={`invoice-${index}`}>
            <div className="container mb-5 mt-3">
              <div className="row d-flex align-items-baseline">
                <div className="col-xl-9">
                  <p style={{ color: '#7e8d9f', fontSize: '20px' }}>Invoice <strong>ID:{invoice.id} </strong></p>
                </div>
                <div className="col-xl-3 float-end">
                  <button className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i
                    className="fas fa-print text-primary"></i> Print</button>
                 <button className="btn btn-light text-capitalize" onClick={exportToJPG}>
                <i className="far fa-file-image text-danger"></i> Export to JPG
                </button>

                </div>
                <hr />
              </div>

              <div className="container">
                <div className="col-md-12">
                  <div className="text-center">
                    <p className="pt-0" style={{ fontSize: '28px' }}>Sirilaka Craving</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li className="text-muted">To:{invoice.address} <span style={{ color: '#5d9fc5' }}></span></li>
                      <li className="text-muted"></li>
                      <li className="text-muted">State, Country</li>
                      <li className="text-muted"><i className="fas fa-phone">{invoice.phone}</i></li>
                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <p className="text-muted">Invoice</p>
                    <ul className="list-unstyled">
                      <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                        className="fw-bold">ID:{invoice.id}</span></li>
                      <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                        className="fw-bold">Creation Date: {invoice.date && invoice.date.toDate().toLocaleDateString()} </span></li>
                      <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                        className="me-1 fw-bold">Status:cash on deleivery</span><span className="badge bg-warning text-black fw-bold">
                          {}</span></li>
                    </ul>
                  </div>
                </div>

                <div className="row my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
  <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    {invoiceData && invoiceData.map((invoice) => (
      invoice.products.map((product, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>Rs{product.price}</td>
          <td>Rs{product.subtotal}</td>
        </tr>
      ))
    ))}
  </tbody>
</table>

                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <p className="ms-3">Add additional notes and payment information</p>
                  </div>
                  <div className="col-xl-3">
                    <ul className="list-unstyled">
                  
                      <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Tax(18%)</span>Rs 350</li>
                    </ul>
                    <p className="text-black float-start"><span className="text-black me-3"> Total Amount{invoice.total}</span><span
                      style={{ fontSize: '25px' }}>Rs{invoice.total}</span></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-10">
                    <p>Thank you for your purchase</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bill;
