import { useContext } from 'react';
import { CampaignContext } from './context/CampaignContext';
import { FaDonate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Community() {
    const { campaigns } = useContext(CampaignContext);
    const communityCampaigns = campaigns.filter(campaign => campaign.category === 'community');
    const navigate = useNavigate();

    const handleDonateClick = (campaignId) => {
        navigate(`/payment/${campaignId}`);
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
                                    className="h-[13rem] object-cover"
                                    src={`http://localhost:3000${campaign.imageUrl}`} 
                                    alt={campaign.name}
                                />
                            </div>
                            <div className="px-4 py-4 text-black">
                                <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                                <p className="text-sm mb-4">{campaign.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">₹ {campaign.donationAmount} raised</span>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
                                        onClick={() => handleDonateClick(campaign._id)}
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
