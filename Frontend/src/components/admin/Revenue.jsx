import React, { useState } from 'react';

const Revenue = () => {
    const [donations, setDonations] = useState([
        // Sample data, you can replace it with your actual data
        { id: 1, userName: 'John Doe', userEmail: 'john@example.com', campaignName: 'Community Help', donationAmount: 100, donationDate: '08/25/2024' },
        { id: 2, userName: 'Jane Smith', userEmail: 'jane@example.com', campaignName: 'Save the Children', donationAmount: 50, donationDate: '08/24/2024' }
    ]);

    return (
        <section className="flex flex-col h-screen">
            <div className="w-[95%] h-[90%] bg-gray-800 m-10 rounded-3xl flex justify-center items-center">
                <div className="h-[98%] w-3/4 bg-gray-600 m-2 rounded-3xl p-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Donation Tracker</h3>
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr>
                                <th className="py-2 border-b">S.No</th>
                                <th className="py-2 border-b">User Name</th>
                                <th className="py-2 border-b">Campaign Name</th>
                                <th className="py-2 border-b">Amount (USD)</th>
                                <th className="py-2 border-b">Date</th>
                                <th className="py-2 border-b">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation, index) => (
                                <tr key={index}>
                                    <td className="py-2 border-b text-center">{donation.id}</td>
                                    <td className="py-2 border-b">{donation.userName}</td>
                                    <td className="py-2 border-b">{donation.campaignName}</td>
                                    <td className="py-2 border-b text-right">{donation.donationAmount}</td>
                                    <td className="py-2 border-b text-center">{donation.donationDate}</td>
                                    <td className="py-2 border-b">{donation.userEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Revenue;
