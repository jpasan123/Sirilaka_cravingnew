import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cardpay() {
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);

  const [cardName, setCardName] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("credit");

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handlePay = () => {
    setShowPinModal(true);
  };

  const handleSubmitPin = () => {
    // Check if pin is correct (e.g., hardcoded as "123456")
    if (pin === "123456") {
      // Navigate to the bill page
      window.location.href = "/bill";
    } else {
      alert("Invalid pin code. Please try again.");
      setPin("");
    }
  };

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleExpireDateChange = (e) => {
    setExpireDate(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
  };

  const handleCardTypeChange = (e) => {
    setSelectedCardType(e.target.value);
  };

  return (
    <div className="h-100 gradient-custom">
      <br />
      <br />
      <section className="h-100 h-custom">
        <h1 style={{ marginLeft: '100px', color: "white" }}>Card Payment Section</h1>
        <div className="container h-10 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: "16px" }}>
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                      <form>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="cardType"
                              id="creditCard"
                              value="credit"
                              checked={selectedCardType === "credit"}
                              onChange={handleCardTypeChange}
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Master
                              Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="cardType"
                              id="debitCard"
                              value="debit"
                              checked={selectedCardType === "debit"}
                              onChange={handleCardTypeChange}
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-6">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                              placeholder="John Smith" value={cardName} onChange={handleCardNameChange} />
                            <label className="form-label" htmlFor="typeName">Name on card</label>
                          </div>
                          <div className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="expire" className="form-control form-control-lg" siez="17"
                              placeholder="MM/YY" value={expireDate} onChange={handleExpireDateChange} />
                            <label className="form-label" htmlFor="expire">Expire date</label>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                              placeholder="1111 2222 3333 4444" minLength="19" maxLength="19" value={cardNumber} onChange={handleCardNumberChange} />
                            <label className="form-label" htmlFor="typeText">Card Number</label>
                          </div>
                          <div className="form-outline mb-4 mb-xl-5">
                            <input type="password" id="typeText" className="form-control form-control-lg"
                              placeholder="CVV" size="3" maxLength="3" value={cvv} onChange={handleCVVChange} />
                            <label className="form-label" htmlFor="typeText">CVV</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                      <div className="d-flex justify-content-between" style={{ fontWeight: "500" }}>
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">Rs.45000</p>
                      </div>
                      <div className="d-flex justify-content-between" style={{ fontWeight: "500" }}>
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0">Rs.350</p>
                      </div>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4" style={{ fontWeight: "500" }}>
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">Rs.45350</p>
                      </div>
                      <button type="button" className="btn btn-primary btn-block btn-lg" onClick={handlePay}>
                        <div className="d-flex justify-content-between">
                          <span>Pay</span>
                          <span>Rs.45350</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pin Modal */}
      {showPinModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Pin Code</h5>
                <button type="button" className="btn-close" onClick={() => setShowPinModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="password" className="form-control" placeholder="Enter Pin Code" value={pin} onChange={handlePinChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSubmitPin}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showPinModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Cardpay;
