import React from 'react';

const RazorpayPage = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const order = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500 }) // Example ₹5
    }).then(res => res.json());

    const options = {
      key: "rzp_test_s5Q4uvAWK0a2Xg", // Replace with your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Donation App",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert(`Payment Successful\nPayment ID: ${response.razorpay_payment_id}`);
        // Optionally send this to backend to verify
      },
      prefill: {
        name: "Parikshit Sankhyan",
        email: "parikshit@example.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handlePayment}
      >
        Pay ₹5 with Razorpay
      </button>
    </div>
  );
};

export default RazorpayPage;
