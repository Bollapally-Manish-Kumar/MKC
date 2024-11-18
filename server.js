
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/healthRecipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});


// Define schemas
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    disease: String
});

const recipeSchema = new mongoose.Schema({
    disease: String,
    recipes: [String]
});

// Define models
const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

// API endpoint to save user data and fetch recipes
app.post('/submit', async (req, res) => {
    try {
        const { name, age, disease } = req.body;
        
        console.log("Received data:", req.body); // Log the received data

        // Save user data
        const user = new User({ name, age, disease });
        await user.save();
        
        console.log("User saved successfully!"); // Log after saving user

        // Fetch recipes based on disease
        const recipeData = await Recipe.findOne({ disease });
        if (recipeData) {
            res.json({ success: true, recipes: recipeData.recipes });
        } else {
            res.json({ success: false, message: "No recipes found for this condition." });
        }
    } catch (error) {
        console.error("Error:", error); // Log the error
        res.status(500).json({ success: false, error: error.message });
    }
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
