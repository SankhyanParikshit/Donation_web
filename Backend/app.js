require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyparser =require('body-parser')
const cors =require('cors') 
const userRouters = require('./routes/userRouters');
const campaignRoutes = require('./routes/campaignRouters');
const paymentRouter = require('./routes/paymentRouters');



const db = require('./config/mongoose-connection');

const app = express();


app.use(bodyparser.json());
app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));




app.use('/user', userRouters);
app.use('/campaigns', campaignRoutes);
app.use('/payment', paymentRouter);



console.log(`NODE_ENV in app.js: ${process.env.NODE_ENV}`);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
