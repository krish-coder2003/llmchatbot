// server.js

// --- Imports ---
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ✅ NEW: Import the Google GenAI SDK (using require() for CommonJS)
const { GoogleGenAI } = require('@google/genai'); 

// --- Configuration ---
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize the Gemini Client
// The SDK automatically finds the GEMINI_API_KEY from your .env file.
const ai = new GoogleGenAI({}); 
const GEMINI_MODEL = "gemini-2.5-flash"; 

// --- API Route Handler ---

// POST route to the Gemini API
app.post("/chat", async (req, res) => {
  // We expect the frontend to send the user's message
  const { message } = req.body; 

  // The conversation content must be in the 'contents' array format
  // For a single turn (stateless) request:
  const contents = [
    { role: "user", parts: [{ text: message }] }
  ];

  try {
    // 💥 CORRECTED CALL: Use the ai.models service
    const response = await ai.models.generateContent({ 
      model: GEMINI_MODEL,
      contents: contents,
    });

    // Extract the final text reply
    const reply = response.text; 
    
    // Check for empty response (e.g., if blocked by safety settings)
    if (!reply) {
        console.error("Gemini Response was empty/blocked. Finish reason:", 
                      response.candidates?.[0]?.finishReason);
        return res.status(500).json({ 
            error: "The AI did not return a response. It may have been blocked by safety settings." 
        });
    }

    res.json({ reply });
    
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Something went wrong with the Gemini API." });
  }
});


// --- Static File Serving (Your Frontend) ---
// This serves the built React app after running npm run build in the frontend folder.
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
);

// --- Start Server ---
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});