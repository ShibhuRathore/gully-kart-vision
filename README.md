
# GullyKart Vision

## 🌟 Overview

GullyKart Vision is an AI-powered, full-stack web application built for Meesho’s “Scripted by Her” initiative. It helps sellers create impactful, hyperlocal marketing campaigns by:

- Forecasting fashion trends around Indian festivals using AI
- Auto-generating personalized campaign kits (posters, captions, flyers, etc.)
- Delivering outputs optimized for WhatsApp, Instagram, and Meesho uploads

---
## 🌐 Deployed Prototype

You can view the deployed version of GullyKart Vision at:  
🔗 **[https://meeshohack.netlify.app](https://meeshohack.netlify.app)**

---


## 🌐 Live Local URLs

- **Frontend**: [http://localhost:8080](http://localhost:8080)
- **AI Backend (FastAPI + Python)**: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---
## 📁 Updated Project Structure

```
gullykart/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── ...                 # Custom components
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   │   └── emailService.ts     # Email/OTP service
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions
├── backend/                     # Backend services
│   ├── server.js               # Email service (Node.js)
│   ├── main.py                 # AI service entry point (FastAPI)
│   ├── auth/                   # Authentication modules
│   ├── requirements.txt        # Python dependencies
│   ├── package.json           # Node.js dependencies
│   ├── venv/                  # Python virtual environment
│   └── .env                   # Backend environment variables
├── ai_engine/                  # Additional AI modules
│   ├── insights_engine.py     # AI trend insights
│   ├── magic.py               # AI utilities
│   ├── trend_researcher.py    # Trend analysis
│   └── requirements.txt       # Python dependencies
├── public/                     # Static assets
├── .env                       # Frontend environment variables
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

---
## 🧰 Tech Stack

### Frontend:
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide Icons
- React Router + Toast Notifications

### Backend:
- **AI Service**: FastAPI + Python
- Replicate API (Image generation)
- Gemini API (Text generation + insights)
- BeautifulSoup (for trend scraping)

---

## 🚀 Local Development Setup

### 🔹 Step 1: Clone the Project
```bash
git clone https://github.com/YOUR_USERNAME/gullykart.git
cd gullykart
```

---

### 🔹 Step 2: Set Up the Frontend
```bash
# Navigate to the frontend folder if separated
npm install         # Install dependencies
npm run dev         # Run frontend in development mode

# For production:
npm run build       # Build optimized static site
```
The frontend runs at: [http://localhost:8080](http://localhost:8080)

---

### 🔹 Step 3: Set Up the AI Backend (FastAPI + Python)
```bash
# Inside /backend or your FastAPI folder
python3 -m venv .venv                   # Create virtual environment
source .venv/bin/activate              # Activate the environment (Linux/macOS)
pip install -r requirements.txt        # Install core Python packages
pip install beautifulsoup4             # Install trend scraper
uvicorn main:app --reload              # Start FastAPI server (dev mode)
```
The backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

To test:
- Open API docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 Example APIs

- `POST /generate-kit`: Generate a full marketing kit using AI
- `POST /trends/opportunities`: Scrape current trends and match them to seller catalog

---



---

## 📦 Production Build Instructions

### Build Frontend:
```bash
npm run build
```

### Run Backend with Production Server (optional):
Use `gunicorn` or `uvicorn` with production flags:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## ❗ Environment Configuration

### `.env` (Frontend)
```env
VITE_API_URL=http://localhost:3001/api
VITE_AI_API_URL=http://127.0.0.1:8000
```

### `.env` (Backend)
```env
GOOGLE_API_KEY=your-gemini-api-key
REPLICATE_API_KEY=your-replicate-api-key
FRONTEND_URL=http://localhost:8080
```

---

## ✨ Key Features

- 🎯 Festival-aware campaign generation
- 🧠 AI image generation using Replicate (SDXL)
- 🔍 Trend forecasting using web scraping (BeautifulSoup)
- 🔒 Secure OTP-based login (Node.js service available in extended version)
- 📈 Data-driven insights for sellers

---

## 📌 Note for Developers

- Use `npm run dev` only for local development.
- Always activate your `.venv` environment before running backend.
- Make sure `.env` files are not committed.

---

## 🙌 Contributors

Made with ❤️ by Team GullyKart for Meesho Hack 2025.



---



## ⚠️ Disclaimer

Due to restrictions on the deployed backend (e.g., Render blocking external image generation and saving), the campaign generator may not function fully online.

📺 To view a working demo of the image generation and campaign creation features, please refer to the recorded video:
🔗 **[https://go.screenpal.com/watch/cTiY1znIVd9](https://go.screenpal.com/watch/cTiY1znIVd9)**

🧑‍💻 Alternatively, to experience the full functionality:
- Clone this repository
- Set up the environment locally
- Follow the development steps in this README to run both frontend and backend


