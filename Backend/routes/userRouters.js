const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/adminMiddleware');
const { login, signup } = require('../controllers/authController');
const { loginValidation, signupValidation } = require('../middlewares/authvalidation');

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/signin', loginValidation, login); 

// Admin routes
router.get('/admin-panel', adminAuth, (req, res) => {
    res.json({ message: 'Welcome to the admin panel' });
});

// Add more admin routes as needed

module.exports = router;
