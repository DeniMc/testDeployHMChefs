// server.js
import express from "express";
const app = express();
import dotenv from "dotenv";

app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Validate the credentials on the server-side
  if (username === "HomeMealChef" && password === "chef123") {
    // Set session or token for the logged-in user
    req.session.isLoggedIn = true;
    res.redirect('/chefspace');
  } else {
    res.send('Invalid credentials. Please try again.');
  }
});

app.get('/chefspace', (req, res) => {
  // Check if the user is logged in
  if (req.session.isLoggedIn) {
    res.sendFile(__dirname + '/chefspace.html');
  } else {
    res.redirect('/');
  }
});

// Endpoint to retrieve the API key
app.get('/api/get-api-key', (req, res) => {
    const apiKey = process.env.GPT_API_KEY; // Retrieve the API key from environment variables
  
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not found' });
    }
  
    res.json({ apiKey });
  });


app.listen(6500, () => {
  console.log('Server is running on port 6500');
});