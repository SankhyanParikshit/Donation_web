import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Fetch campaigns from the backend when the component mounts
        axios.get('http://localhost:3000/campaigns/list')
            .then(response => {
                setCampaigns(response.data.campaigns);
            })
            .catch(error => console.error("Error fetching campaigns: ", error));
    }, []);

    const addCampaign = (campaign) => {
        const formData = new FormData();
        formData.append('name', campaign.name);
        formData.append('category', campaign.category);
        formData.append('donationAmount', campaign.donationAmount);
        formData.append('description', campaign.description);
        formData.append('image', campaign.image);

        axios.post('http://localhost:3000/campaigns/create', formData)
            .then(response => {
                setCampaigns(prevCampaigns => [...prevCampaigns, response.data]);
            })
            .catch(error => console.error("Error adding campaign: ", error));
    };

    const updateCampaign = (updatedCampaign) => {
        const formData = new FormData();
        formData.append('name', updatedCampaign.name);
        formData.append('category', updatedCampaign.category);
        formData.append('donationAmount', updatedCampaign.donationAmount);
        formData.append('description', updatedCampaign.description);
        if (updatedCampaign.image) {
            formData.append('image', updatedCampaign.image);
        }

        axios.put(`http://localhost:3000/campaigns/update/${updatedCampaign.id}`, formData)
            .then(response => {
                setCampaigns(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign.id === updatedCampaign.id ? response.data : campaign
                    )
                );
            })
            .catch(error => console.error("Error updating campaign: ", error));
    };

    const deleteCampaign = (id) => {
        axios.delete(`http://localhost:3000/campaigns/delete/${id}`)
            .then(() => {
                setCampaigns(prevCampaigns =>
                    prevCampaigns.filter(campaign => campaign.id !== id)
                );
            })
            .catch(error => console.error("Error deleting campaign: ", error));
    };

    return (
        <CampaignContext.Provider
            value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}
        >
            {children}
        </CampaignContext.Provider>
    );
};
