# Roadmap Viewer Backend

FastAPI backend for the Compass AI Roadmap Viewer application. Provides REST APIs for roadmap management, user authentication, and AI-powered roadmap generation.

## 🏗️ Architecture

The backend is built with:
- **FastAPI**: Modern, high-performance web framework
- **SQLAlchemy**: ORM for database operations
- **Supabase (PostgreSQL)**: Remote database with Row Level Security
- **Clerk**: Authentication and user management
- **OpenAI**: AI-powered roadmap generation
- **uv**: Fast Python package manager

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── api/                 # API route handlers
│   │   └── routers/         # Modular routers (roadmaps, users, agents)
│   ├── agents/              # AI agent logic and prompts
│   ├── core/                # Core configuration and dependencies
│   ├── models/              # SQLAlchemy database models
│   └── services/            # Business logic layer
├── scripts/                 # Utility scripts
├── pyproject.toml           # Project dependencies and metadata
└── uv.lock                  # Locked dependency versions
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- `uv` package manager
- Supabase project (remote database)
- Clerk application
- OpenAI API key

### Installation

1. **Install uv** (if not already installed):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Environment Variables**:
   Create a `.env` file in the `backend/` directory with the following variables:
   ```bash
   # Database
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # Authentication
   CLERK_ISSUER_URL=https://your-clerk-domain.clerk.accounts.dev
   
   # Encryption (for storing user API keys)
   ENCRYPTION_KEY=your-32-character-encryption-key
   
   # OpenAI (optional, for server-side AI generation)
   OPENAI_API_KEY=sk-...
   ```

## 🛠️ Development

### Run the Server
```bash
uv run uvicorn app.main:app --reload
```
- API: `http://localhost:8000`
- Interactive Docs: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

### Linting & Formatting
```bash
uv run ruff check .      # Check for linting issues
uv run ruff format .     # Auto-format code
```

### Testing
```bash
uv run pytest            # Run all tests
uv run pytest -v         # Verbose output
uv run pytest --cov      # With coverage report
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - Root endpoint

### Roadmaps
- `GET /api/roadmaps` - List user's roadmaps
- `POST /api/roadmaps` - Create new roadmap
- `GET /api/roadmaps/{id}` - Get specific roadmap
- `PUT /api/roadmaps/{id}` - Update roadmap
- `DELETE /api/roadmaps/{id}` - Delete roadmap

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/has-api-key/{provider}` - Check if user has API key
- `POST /api/users/api-keys` - Store encrypted API key
- `DELETE /api/users/api-keys/{provider}` - Remove API key

### Agents (AI Generation)
- `POST /api/agents/assess` - Run assessment agent
- `POST /api/agents/gap-analysis` - Analyze skill gaps
- `POST /api/agents/generate-roadmap` - Generate personalized roadmap

## 🔒 Security

- **Authentication**: JWT tokens validated via Clerk
- **API Key Encryption**: User-provided OpenAI keys encrypted with AES-256 before storage
- **CORS**: Configured for frontend origin (`http://localhost:3000`)
- **RLS**: Database-level security via Supabase Row Level Security

## 🐛 Known Issues

- **UUID Type Mismatch**: There is a known `sqlalchemy.exc.ProgrammingError` related to UUID type handling in the `/api/users/has-api-key/{provider}` endpoint. This is tracked and will be addressed in a future update.

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [uv Documentation](https://docs.astral.sh/uv/)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)

## 📄 License

Private - Do not distribute.
