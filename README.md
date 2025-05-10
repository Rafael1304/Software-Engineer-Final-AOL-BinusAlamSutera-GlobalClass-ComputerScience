# Software-Engineer-Final-AOL-BinusAlamSutera-GlobalClass-ComputerScience
Software Engineer final 

# 📊 Fitrack Anomaly Analyzer

An interactive web application for uploading CSV datasets, detecting anomalies using Isolation Forest (via FastAPI), and receiving natural language summaries and charts. Features include chatbot assistance, email sharing, dark/light mode toggle, and multilingual support (English + Bahasa).

---

## 🧩 Features

- ✅ Upload and analyze CSV files
- 💬 Smart chatbot with anomaly summary responses
- 🌐 Multilingual support (English & Bahasa)
- 🌙 Dark/Light mode toggle
- 📈 Visual anomaly bar chart
- 📬 Share results via Email (EmailJS)
- 🧠 Auto-generated summary reports
- 🔁 Reset and re-analyze with ease

## 🗂️ Project Structure
project-root/
│
├── backend/ # FastAPI backend
│ ├── main.py # API endpoints
│ └── requirements.txt # Backend dependencies
│
├── frontend/ # React + Vite frontend
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── src/
│ ├── App.jsx
│ ├── components/
│ │ ├── Chatbot.jsx
│ │ ├── FileUploader.jsx
│ │ ├── ShareResult.jsx
│ │ ├── EmailSender.jsx
│ │ ├── SettingsPanel.jsx
│ │ └── i18n.js
│ └── index.css

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Python](https://www.python.org/) (3.8+)
- Git & Command line

## FrontEnd Setup
- cd frontend
- npm install
- npm run dev

## Backend Setup
- cd backend
- python -m venv venv
- venv\Scripts\activate       # On Windows
- pip install -r requirements.txt
- uvicorn main:app --reload
