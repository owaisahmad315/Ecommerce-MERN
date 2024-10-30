// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";

// function PaypalReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const paymentId = params.get("paymentId");
//   const payerId = params.get("PayerID");

//   useEffect(() => {
//     if (paymentId && payerId) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

//       dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
//         if (data?.payload?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           window.location.href = "/shop/payment-success";
//         }
//       });
//     }
//   }, [paymentId, payerId, dispatch]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing Payment...Please wait!</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaypalReturnPage;




// stripe


import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function StripePaymentPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // You will receive the clientSecret via query or state (depends on how you implement it)
    const params = new URLSearchParams(location.search);
    const secret = params.get("pk_test_51QBym8FSJ9zOghjYZbb2TaU1sV8IuftglU0ZdattaLcjd5g53g9miODrAzQ6jSG8aFLAX3i8WyHIzBQFpfGYKsuC006DiQAZPR");

    if (secret) {
      setClientSecret(secret);
    }
  }, [location]);

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      // Dispatch the action to update order and redirect to success page
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentIntentId: result.paymentIntent.id, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  };

  useEffect(() => {
    if (clientSecret) {
      handlePayment();
    }
  }, [clientSecret]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default StripePaymentPage;
