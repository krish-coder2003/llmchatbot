# 💬 LLM Chatbot | Gemini API + React/Node.js

A modern, full-stack chatbot application built to demonstrate seamless integration between a Node.js/Express backend and the Google Gemini API. The frontend features a clean, responsive **Glassmorphism** aesthetic.

This project is ideal for students and developers looking for a ready-to-go, secure template for building AI-powered web applications.

## ✨ Features

* **Free Tier Powered:** Uses the secure, free tier of the **Gemini 2.5 Flash** model.
* **Full-Stack:** Separates API logic (Node/Express) from the presentation layer (React).
* **Modern UI:** Features a dark-mode, Glassmorphism design for a professional, futuristic look.
* **Secure API Handling:** Uses the `.env` file to securely load the API key on the server (never exposed to the client or committed to Git).
* **Markdown Support:** Displays the model's responses correctly using Markdown formatting.

## ⚙️ Technologies Used

* **Frontend:** React.js, HTML/CSS (Custom Glassmorphism), `react-markdown`
* **Backend:** Node.js, Express.js
* **AI Service:** Google Gemini API (via the `@google/genai` SDK)

---

## 🚀 Getting Started Locally

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18+)
* [npm](https://www.npmjs.com/) (Node Package Manager)
* A free [Gemini API Key](https://aistudio.google.com/app/apikey) from Google AI Studio.

### Installation

1.  Clone the Repository
    ```bash
    git clone YOUR_REPO_URL_HERE
    cd YOUR_REPO_NAME
    ```

2.  Install Backend Dependencies
    ```bash
    npm install
    ```

3.  Install Frontend Dependencies
    ```bash
    npm install --prefix frontend
    ```

4.  Configure API Key
    Create a file named **`.env`** in the root directory and add your API key:
    ```env
    # Your key will NOT be uploaded to GitHub (.env is in .gitignore)
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

5.  Build the Frontend UI
    This compiles the React code and creates the `build` folder that the Node.js server uses.
    ```bash
    npm run build --prefix frontend
    ```

6.  Run the Application
    Start the Node.js server, which also serves the React frontend:
    ```bash
    npm start
    ```

The application will now be running at `http://localhost:3000`.

---

## 🤝 Contribution

Feel free to fork this repository, open issues, or submit pull requests.


## 👤 Author

* **Your Name** - [GitHub Profile Link](//github.com/krish-coder2003)
