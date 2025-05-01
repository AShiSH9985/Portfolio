// const express= require("express")
// const app=express();
// const dbConnect=require("./db/db.js")
// dbConnect();

// app.post('/create',(req,res)=>{
//     res.send("hello")
// })

// app.listen(3000,()=>{
//     console.log("server is running");
// })


// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/contact-form', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("Mongo Error:", err));

// // Schema & Model
// const ContactSchema = new mongoose.Schema({
//   name:String,
//   email: String,
//   message: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Contact = mongoose.model('Contact', ContactSchema);

// // API Route
// app.post('/api/contact', async (req, res) => {
//   const {name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: 'Name,Email and message are required.' });
//   }

//   try {
//     const newEntry = new Contact({ name,email, message });
//     await newEntry.save();
//     res.json({ message: 'Message received and saved!' });
//   } catch (error) {
//     console.error('Save Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/online-portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Mongoose Schema
const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a Mongoose Model
const Form = mongoose.model('Form', FormSchema);

// POST endpoint to store form data
app.post('/submit-form', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(201).send('Form data saved successfully!');
    } catch (error) {
        res.status(400).send('Error saving form data');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
