from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Roadmap Viewer API")

# Configure CORS - MUST be before router imports
origins = [
    "http://localhost:3000",  # Next.js frontend
    "http://127.0.0.1:3000",  # Alternative localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Allow frontend to read all response headers
)

# Import routers AFTER CORS middleware
from app.api.routers import agents, roadmaps, users

app.include_router(roadmaps.router, prefix="/api/roadmaps", tags=["roadmaps"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}
