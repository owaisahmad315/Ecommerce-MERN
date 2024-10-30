 import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Thank You for Shopping with Us!</h1>
      <p>Your order has been confirmed and is being processed.</p>
      <Link to="/" style={{ marginTop: "20px", display: "block" }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
