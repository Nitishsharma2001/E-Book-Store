import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const CardCheckout = () => {
  const params = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(params);

  const handleCheckout = () => {
    console.log("cardNumber: ", cardNumber);
    console.log("cardName: ", cardName);
    console.log("expiryDate: ", expiryDate);
    console.log("cvv: ", cvv);
    setIsSubmitted(true);
    
  };
  if (isSubmitted && params.id) {
    return <Navigate to={`/order-success/${params.id}`} replace={true} />;
  }
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white mx-auto mt-10">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cardName"
          >
            Cardholder Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CardCheckout;
