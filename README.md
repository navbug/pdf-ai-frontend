# PDF AI - PDF Compliance Checker

A full-stack application that validates PDF documents against custom compliance rules using Google Gemini AI.

## 📸 Screenshot



## 🚀 Quick Start

### Prerequisites

- Google Gemini API Key

### 1. Clone & Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

Start backend:
```bash
npm start
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open App

Visit: `http://localhost:5173`

## 📖 Usage

1. **Upload PDF** - Drag & drop or click to upload (max 10MB)
2. **Enter 3 Rules** - Define compliance rules to check
3. **Click Validate** - AI analyzes and returns results

### Example Rules

- "The document must have a purpose section"
- "The document must mention at least one date"
- "The document must define key terms"

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| Vite | Express |
| Tailwind CSS | Multer |
| Lucide Icons | Gemini AI |

## 📁 Project Structure

```
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```
