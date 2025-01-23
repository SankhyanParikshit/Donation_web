const Campaign = require('../models/Campaign-model');

exports.createCampaign = async (req, res) => {
  try {
    const { name, category, donationAmount, description } = req.body;
    const imageUrl = req.file ? `/assets/images/${req.file.filename}` : null; 

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newCampaign = new Campaign({
      name,
      category,
      donationAmount,
      description,
      imageUrl,
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.listCampaigns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;

    const total = await Campaign.countDocuments();
    const campaigns = await Campaign.find().skip(startIndex).limit(limit);

    res.json({
      campaigns,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCampaigns: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, donationAmount, description } = req.body;
    const updateData = { name, category, donationAmount, description };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};