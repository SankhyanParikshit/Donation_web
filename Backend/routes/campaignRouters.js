const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const campaignController = require('../controllers/Campaigncontroller');

// Step 1: Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save the uploaded files in the assets/images directory
    cb(null, path.join(__dirname, '../assets/images'))
  },
  filename: function (req, file, cb) {
    // Use the current timestamp plus the original file extension as the filename
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Campaign routes
router.post('/create', upload.single('image'), campaignController.createCampaign);
router.get('/list', campaignController.listCampaigns);
router.put('/update/:id', upload.single('image'), campaignController.updateCampaign);
router.delete('/delete/:id', campaignController.deleteCampaign);

module.exports = router;
