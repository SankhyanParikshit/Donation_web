import React, { useState, useEffect, useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';

const Campaigns = () => {
    const [campaignName, setCampaignName] = useState('');
    const [category, setCategory] = useState('');
    const [donationAmount, setDonationAmount] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useContext(CampaignContext);

    const campaignsPerPage = 5;

    useEffect(() => {
        if (editingCampaign) {
            setCampaignName(editingCampaign.name);
            setCategory(editingCampaign.category);
            setDonationAmount(editingCampaign.donationAmount);
            setDescription(editingCampaign.description);
            setPreview(editingCampaign.imageUrl);
        }
    }, [editingCampaign]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newCampaign = {
            id: editingCampaign ? editingCampaign.id : undefined,
            name: campaignName,
            category,
            donationAmount,
            description,
            image: image,  // Image file to be sent in FormData
        };

        if (editingCampaign) {
            updateCampaign(newCampaign);
            setEditingCampaign(null);
        } else {
            addCampaign(newCampaign);
        }

        setCampaignName('');
        setCategory('');
        setDonationAmount('');
        setDescription('');
        setImage(null);
        setPreview(null);
    };

    const handleEdit = (campaign) => {
        setEditingCampaign(campaign);
        setImage(null); // Reset image to ensure new image can be uploaded
    };

    const handleDelete = (id) => {
        deleteCampaign(id);
    };


    // Pagination logic
    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className='flex flex-col h-screen'>
            <div className='w-[95%] h-[90%] bg-gray-800 m-10 rounded-3xl flex'>
                <div className='h-[98%] w-[40%] bg-red-600 m-2 rounded-3xl'>
                    <div className="h-full mx-auto bg-white p-8 rounded-3xl shadow-md overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-6">{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Campaign Name</label>
                                <input
                                    type="text"
                                    value={campaignName}
                                    onChange={(e) => setCampaignName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder="Enter campaign name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="social">Social</option>
                                    <option value="community">Community</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Donation Amount (₹)</label>
                                <input
                                    type="number"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder="Enter donation amount"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder="Enter campaign description"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-2 border rounded"
                                    accept="image/*"
                                />
                                {preview && (
                                    <div className="mt-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                {editingCampaign ? 'Update Campaign' : 'Submit Campaign'}
                            </button>
                        </form>
                    </div>
                </div>
                <div className='h-[98%] w-[60%] bg-red-600 m-2 rounded-3xl'>
                    <div className="h-full mx-auto bg-white p-8 rounded-3xl shadow-md overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Submitted Campaigns</h3>
                        <table className="min-w-full bg-white border rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 border-b text-center">S.NO</th>
                                    <th className="py-2 border-b text-center">Name</th>
                                    <th className="py-2 border-b text-center">Category</th>
                                    <th className="py-2 border-b text-center">Donation (₹)</th>
                                    <th className="py-2 border-b text-center">Description</th>
                                    <th className="py-2 border-b text-center">Image</th>
                                    <th className="py-2 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCampaigns.map((campaign) => (
                                    <tr key={campaign.id}>
                                        <td className="py-2 border-b text-center">{campaign.id}</td>
                                        <td className="py-2 border-b text-center">{campaign.name}</td>
                                        <td className="py-2 border-b text-center">{campaign.category}</td>
                                        <td className="py-2 border-b text-center">{campaign.donationAmount}</td>
                                        <td className="py-2 border-b text-center">{campaign.description}</td>
                                        <td className="py-2 border-b text-center">
                                            {campaign.imageUrl && (
                                                <img
                                                    src={`http://localhost:3000${campaign.imageUrl}`} alt={campaign.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="py-2 border-b text-center">
                                            <button
                                                onClick={() => handleEdit(campaign)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2 transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(campaign.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: Math.ceil(campaigns.length / campaignsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Campaigns;
