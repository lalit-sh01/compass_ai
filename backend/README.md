# Roadmap Viewer Backend

FastAPI backend for the Roadmap Viewer application.

## Setup

This project uses `uv` for dependency management.

1. **Install uv** (if not already installed):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Environment Variables**:
   Copy `.env.example` to `.env` (create one if it doesn't exist) and set the required variables:
   - `DATABASE_URL`
   - `CLERK_ISSUER_URL`
   - `ENCRYPTION_KEY`
   - `OPENAI_API_KEY`

## Development

### Run the Server
```bash
uv run uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.
Docs: `http://localhost:8000/docs`.

### Linting & Formatting
```bash
uv run ruff check .
uv run ruff format .
```

### Testing
```bash
uv run pytest
```
