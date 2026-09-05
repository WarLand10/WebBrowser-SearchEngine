# Installation Guide

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB minimum
- **Node.js**: 18.0.0 or higher
- **Python**: 3.11 or higher
- **MongoDB**: 5.0 or higher (provided via Docker)
- **Docker**: 20.10 or higher (recommended)
- **Docker Compose**: 1.29 or higher (recommended)

## Installation Methods

### Method 1: Docker Compose (Recommended)

**Easiest way to get started!**

#### Step 1: Install Docker

- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: 
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```

#### Step 2: Clone Repository

```bash
git clone https://github.com/WarLand10/WebBrowser-SearchEngine.git
cd WebBrowser-SearchEngine
```

#### Step 3: Start Services

```bash
docker-compose up -d
```

#### Step 4: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Search Engine**: http://localhost:8000
- **API Health**: http://localhost:5000/health

### Method 2: Manual Installation

#### Prerequisites

1. **Install Node.js**
   - Download from https://nodejs.org/
   - Verify: `node --version && npm --version`

2. **Install Python**
   - Download from https://www.python.org/
   - Verify: `python --version`

3. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

#### Step 1: Frontend Setup

```bash
cd frontend
npm install
npm run build
npm run dev
```

Frontend runs on: http://localhost:5173

#### Step 2: Backend Setup

Open new terminal:

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection string
npm run dev
```

Backend runs on: http://localhost:5000

#### Step 3: Search Engine Setup

Open new terminal:

```bash
cd search-engine
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env

python app.py
```

Search Engine runs on: http://localhost:8000

### Method 3: Cloud Deployment

#### Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create new app
heroku create webbrowser-app

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

#### AWS

1. Create EC2 instance (t3.medium or larger)
2. SSH into instance
3. Install Docker: `curl -fsSL https://get.docker.com | sh`
4. Clone repository
5. Run: `docker-compose up -d`

#### Google Cloud

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash

# Deploy each service to Cloud Run
gcloud run deploy webbrowser-frontend --source ./frontend
gcloud run deploy webbrowser-backend --source ./backend
gcloud run deploy webbrowser-search --source ./search-engine
```

## Verification

After installation, verify everything is working:

```bash
# Check backend
curl http://localhost:5000/health
# Should return: {"status":"OK","timestamp":"2024-01-15T10:30:00Z"}

# Check search engine
curl http://localhost:8000/health
# Should return: {"status":"OK"}

# Try a search
curl "http://localhost:5000/api/search?q=test"
```

## First Time Setup

1. Open http://localhost:3000
2. Click "Register" and create account
3. Log in with your credentials
4. Add a bookmark or perform a search
5. Explore the browser features

## Troubleshooting

### MongoDB Connection Error

**Problem**: "Cannot connect to MongoDB"

**Solution**:
```bash
# Check MongoDB is running
mongosh --version

# Update connection string in .env
MONGODB_URI=mongodb://localhost:27017/webbrowser
```

### Port Already in Use

**Problem**: "Address already in use :3000"

**Solution**:
```bash
# Change port in .env or use different port
# Linux/Mac:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node Modules Error

**Problem**: "Cannot find module"

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python Virtual Environment

**Problem**: "python: no module named"

**Solution**:
```bash
# Ensure venv is activated
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate      # Windows

# Reinstall packages
pip install -r requirements.txt
```

## Next Steps

After successful installation:

1. Read [API Documentation](docs/API.md)
2. Check out [Architecture](docs/ARCHITECTURE.md)
3. Review [Deployment Guide](docs/DEPLOYMENT.md)
4. Join our community (GitHub Discussions)
5. Start contributing!

## Getting Help

- **Documentation**: See `docs/` folder
- **Issues**: Report bugs on [GitHub Issues](https://github.com/WarLand10/WebBrowser-SearchEngine/issues)
- **Discussions**: Ask questions on [GitHub Discussions](https://github.com/WarLand10/WebBrowser-SearchEngine/discussions)
- **Email**: Contact us at support@webbrowser.local

## System Specifications

### Development Machine

- **CPU**: 2+ cores
- **RAM**: 4GB minimum
- **Storage**: 10GB free space
- **Network**: Stable internet connection

### Production Server

- **CPU**: 4+ cores
- **RAM**: 8GB minimum
- **Storage**: 50GB+ SSD
- **Network**: High-speed internet
- **Backup**: Regular automated backups

## What's Included

After installation, you get:

✅ Full-featured web browser
✅ Powerful search engine
✅ User authentication
✅ Bookmark management
✅ History tracking
✅ Dark/light theme
✅ Responsive design
✅ Mobile-friendly UI
✅ REST API
✅ MongoDB integration
✅ Docker setup
✅ Documentation
