import React, { useContext } from 'react';
import { CampaignContext } from './context/CampaignContext';
import { FaDonate } from 'react-icons/fa';
import axios from 'axios';

export default function Community() {
  const { campaigns } = useContext(CampaignContext);
  const communityCampaigns = campaigns.filter(campaign => campaign.category === 'community');

  const handleDonate = async (campaign) => {
    try {
      // Step 1: Create an order on your server
      const res = await axios.post('http://localhost:3000/payment/create-order', {
        amount: 500, // Example amount in rupees. You can make this dynamic.
        currency: 'INR'
      });

      const { order } = res.data;

      // Step 2: Configure Razorpay options
      const options = {
        key: 'import.meta.env.VITE_RAZORPAY_KEY_ID', // 🔁 Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Donate to ' + campaign.name,
        description: campaign.description,
        image: '/vite.svg', // Optional: Your logo
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          // Here you can handle the success logic, like:
          // - Showing a success message
          // - Updating the UI with the new donation amount
          // - Redirecting to a thank you page
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999'
        },
        theme: {
          color: "#3399cc"
        }
      };

      // Step 3: Open the Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate the payment process. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white py-8">
      <div className="w-[95%] flex flex-col gap-8 bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-wrap gap-8">
          {communityCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                <img
                  className="w-full h-[13rem] object-cover"
                  src={`http://localhost:3000${campaign.imageUrl}`}
                  alt={campaign.name}
                />
              </div>
              <div className="px-4 py-4 text-black">
                <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                <p className="text-sm mb-4">{campaign.description}</p>
                <div className="flex justify-between items-center">
                  {/* Note: Ensure 'campaign.donationAmount' exists on your campaign object */}
                  <span className="text-sm font-medium">₹ {campaign.donationAmount || 0} raised</span>
                  <button
                    type="button" // Good practice to prevent form submission
                    onClick={() => handleDonate(campaign)} // Updated to call handleDonate directly
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
                  >
                    <FaDonate className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}