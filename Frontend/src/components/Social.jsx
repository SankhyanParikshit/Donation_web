import React, { useContext } from 'react';
import { CampaignContext } from './context/CampaignContext';
import { FaDonate } from 'react-icons/fa';
import axios from 'axios';

export default function Social() {
  const { campaigns } = useContext(CampaignContext);
  const socialCampaigns = campaigns.filter(c => c.category === 'social');

  const handleDonate = async (campaign) => {
    try {
      const res = await axios.post('http://localhost:3000/payment/create-order', {
        amount: 500, // in rupees
        currency: 'INR'
      });

      const { order } = res.data;

      const options = {
        key: 'import.meta.env.VITE_RAZORPAY_KEY_ID', // 🔁 Replace with your real key
        amount: order.amount,
        currency: order.currency,
        name: 'Donate to ' + campaign.name,
        description: campaign.description,
        image: '/vite.svg',
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
          // Redirect to a success page or handle logic
        },
        prefill: {
          name: 'Your Name',
          email: 'your@email.com',
          contact: '9999999999'
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open(); // ✅ This opens the modal
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment.");
    }
  };


  return (
    <div className="flex justify-center items-start min-h-screen bg-white py-8">
      <div className="w-[95%] flex flex-col gap-8 bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-wrap gap-8">
          {socialCampaigns.map((campaign, index) => (
            <div key={index} className="w-72 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
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
                  <span className="text-sm font-medium">₹ {campaign.donation} raised</span>
                  <button
                    type="button"  // ✅ This prevents implicit submit behavior
                    onClick={() => handleDonate(campaign)}
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
