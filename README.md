# Legal Document Search Portal

A web application for searching and summarizing legal documents. Built with React (frontend) and FastAPI (backend).

## Features

- Search through legal documents using natural language queries
- View top 3 most relevant results with summaries
- Professional UI with loading states and error handling
- Responsive design that works on all devices
- Docker support for easy deployment

## Quick Start

### Using Docker (Recommended)

```bash
docker-compose up --build
```

Then open http://localhost:3000 in your browser.

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows Git Bash
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
acme/
├── backend/           # FastAPI backend
│   ├── main.py       # API endpoints and mock data
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   │   ├── App.jsx   # Main component
│   │   └── App.css   # Styling
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

- `POST /generate` - Search for legal documents
  - Request: `{ "query": "search term" }`
  - Returns: Top 3 matching documents with summaries

- `GET /health` - Health check endpoint

- `GET /docs` - Interactive API documentation (Swagger UI)

   Swagger UI: http://localhost:8000/docs

   ReDoc: http://localhost:8000/redoc

   OpenAPI JSON: http://localhost:8000/openapi.json

## Sample Searches

Try searching for:
- "employment contract"
- "privacy compliance"
- "merger checklist"
- "intellectual property"
- "non-disclosure agreement"

## Technologies

- **Frontend**: React 18, Vite, Axios
- **Backend**: FastAPI, Pydantic, Uvicorn
- **Deployment**: Docker, Docker Compose

## Development

The backend uses mock data stored in `backend/main.py`. In production, this would connect to a real legal document database.

CORS is configured for local development (ports 3000 and 5173). Update `main.py` for production deployment.

## License

Educational project for demonstration purposes.
