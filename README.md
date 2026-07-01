# Tata Steel — Surface Defect Analysis System

An AI-powered web app that classifies defects on steel surfaces from an uploaded image.
Built with a React frontend and a Node.js/Express backend that calls the Claude Vision API.

## How it works

1. User uploads an image of a steel surface in the React UI.
2. The image is sent to the Express backend.
3. The backend forwards the image to Claude's vision model along with a
   predefined defect catalogue (Scratches, Patches, Sliver, Crazing, Pitted
   Surface, Inclusion, Rolled-in Scale, Rust/Oxidation, Dent, No Defect).
4. Claude returns the matching defect category, a confidence score, a short
   description, and a recommended QC action.
5. The result is displayed on the React UI.

## Project structure

```
steel-defect-analyzer/
├── backend/
│   ├── server.js                    # Express app entry point
│   ├── src/
│   │   ├── routes/analyze.js        # /api/analyze-defect, /api/defect-catalogue
│   │   ├── services/claudeService.js# Calls Claude Vision API
│   │   ├── middleware/upload.js     # Multer image upload handling
│   │   └── config/defectCatalogue.js# Predefined defect categories
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx                  # Main app layout/state
    │   ├── components/
    │   │   ├── ImageUploader.jsx    # Drag-and-drop / file picker + preview
    │   │   ├── ResultDisplay.jsx    # Shows defect name, confidence, notes
    │   │   ├── DefectCatalogue.jsx  # Collapsible list of defect categories
    │   │   └── Loader.jsx
    │   ├── services/api.js          # Axios calls to backend
    │   └── App.css / index.css
    ├── package.json
    └── .env.example
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY (get one at https://console.anthropic.com/)
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 3. Use it

Open `http://localhost:5173`, upload a steel surface image, click **Analyze
Defect**, and the detected defect category, confidence score, and
recommended action will appear on screen.

## API Endpoints

| Method | Endpoint                | Description                                   |
|--------|--------------------------|------------------------------------------------|
| GET    | `/api/health`            | Health check                                   |
| GET    | `/api/defect-catalogue`  | Returns the predefined list of defect classes  |
| POST   | `/api/analyze-defect`    | Accepts `multipart/form-data` with an `image` field; returns classification JSON |

### Example response from `/api/analyze-defect`

```json
{
  "success": true,
  "fileName": "sample.jpg",
  "result": {
    "defectType": "Scratches",
    "confidence": 88,
    "description": "Multiple thin parallel linear marks are visible across the surface, consistent with mechanical abrasion.",
    "recommendation": "Flag the coil for surface re-inspection before shipment."
  }
}
```

## Notes / Next steps

- Swap `memoryStorage` in `upload.js` for cloud storage (S3, GCS) if you need
  to retain uploaded images for audit trails.
- Add authentication (e.g. JWT) before deploying to a shared/production environment.
- To extend the defect catalogue, just add entries to
  `backend/src/config/defectCatalogue.js` — the AI prompt updates automatically.
- For production, build the frontend (`npm run build`) and serve the static
  files from the backend or a CDN.
