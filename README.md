# 🏀 Basketball Buddies

**Basketball Buddies** is a cross-platform mobile app that connects local basketball players based on skill level. The app offers matchmaking, team play, Elo-based rankings, and an AI-powered refereeing system to ensure fair scoring.

---

## 📱 Features

- 🔍 Search for nearby pickup games  
- 👥 Team up with friends in 1v1, 2v2, or 3v3 mode  
- 🏅 Elo-based ranking system (Bronze → Silver → Gold → Platinum)  
- 🤖 AI-powered refereeing system to detect made shots  
- 📈 Real-time performance feedback

---

## 💡 AI Refereeing System

Our AI system uses **YOLOv5** and **OpenCV** to detect made baskets from uploaded game footage. A Python-based backend processes frames, detects successful shots, and sends results to the frontend using a custom pipeline built with **Flask** and **Node.js**.

---

## 🛠️ Tech Stack

- **Frontend**: React Native, React.js  
- **Backend**: Node.js, Flask  
- **AI/ML**: YOLOv5, Python, OpenCV  
- **Database**: Firebase  
- **Other**: GitHub, Agile Methodology

---

## 🚀 Getting Started

> 🔐 API keys and sensitive credentials have been removed. Add your own `.env` file with necessary keys to run locally.

### Prerequisites

- Node.js & npm  
- Python 3.x  
- Expo Go (for mobile testing)  
- Git

### Run the App

```bash
# Frontend
cd mobile-app
npm install
npm start

# Backend
cd backend
pip install -r requirements.txt
python app.py
📂 Folder Structure
bash
Copy
Edit
BasketballBuddies/
├── mobile-app/       # React Native frontend
├── backend/          # Flask + Node.js backend
├── ai-referee/       # YOLOv5 & OpenCV scripts
└── README.md
👥 Team
Aiden Baraiac – AI Refereeing System, OpenCV, Frontend Integration

Bryce Benedetto – Front-End Development (Profile, Home, Friends, Settings, Match Pages)

Pablo Avila – Matchmaking, Ranking System

Christopher Brouhard – User Database, Match Database, Cloud Storage

Viswa Ponnusamy – Login Page, Signup Page

Evan Bruce – Team Lead

📄 License
This project was built for educational and portfolio purposes only.
Please do not copy, redistribute, or commercialize without permission.
