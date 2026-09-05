# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Python 3.11+ (for search engine)
- MongoDB (managed by Docker Compose)

## Quick Start with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/WarLand10/WebBrowser-SearchEngine.git
cd WebBrowser-SearchEngine
```

### 2. Setup Environment Variables

Create `.env` files for each service:

**backend/.env**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/webbrowser
JWT_SECRET=your-super-secret-jwt-key-change-this
API_BASE_URL=http://localhost:5000
SEARCH_ENGINE_URL=http://search-engine:8000
CORS_ORIGIN=http://localhost:3000
```

**search-engine/.env**
```env
PORT=8000
MONGODB_URI=mongodb://admin:password@mongodb:27017/webbrowser
MAX_CRAWL_DEPTH=3
MAX_PAGES_PER_DOMAIN=100
USER_AGENT=WebBrowser-SearchEngine/1.0
REQUEST_TIMEOUT=10
```

### 3. Start Services

```bash
docker-compose up -d
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Search Engine**: http://localhost:8000
- **MongoDB**: localhost:27017

### 4. Verify Services

```bash
# Check if all containers are running
docker-compose ps

# Check backend health
curl http://localhost:5000/health

# Check search engine health
curl http://localhost:8000/health
```

### 5. Stop Services

```bash
docker-compose down

# Remove data volumes (be careful!)
docker-compose down -v
```

## Local Development

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs on http://localhost:5000

### Search Engine Setup

```bash
cd search-engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on http://localhost:8000

## Production Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Build images
docker-compose build

# Deploy
docker-compose -f docker-compose.yml up -d

# Check logs
docker-compose logs -f
```

### Option 2: Kubernetes

Create deployment manifests for production:

```yaml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webbrowser-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: webbrowser-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: uri
```

### Option 3: Cloud Providers

#### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create webbrowser-app

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

#### AWS

1. Create EC2 instance
2. Install Docker and Docker Compose
3. Clone repository
4. Configure security groups and environment variables
5. Run `docker-compose up -d`

#### Google Cloud

1. Create Cloud Run services for each component
2. Create Cloud SQL for MongoDB
3. Deploy using `gcloud run deploy`

## SSL/TLS Configuration

### With Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --standalone -d yourdomain.com

# Configure Nginx
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem .
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem .
```

## Database Backup

```bash
# Backup MongoDB
mongodump --uri "mongodb://admin:password@localhost:27017/webbrowser" --out /backup

# Restore from backup
mongorestore --uri "mongodb://admin:password@localhost:27017" /backup
```

## Monitoring

### Log Aggregation

```bash
# View logs from all services
docker-compose logs -f

# View only backend logs
docker-compose logs -f backend
```

### Health Checks

```bash
# Create health check endpoint
GET http://localhost:5000/health
GET http://localhost:8000/health
```

### Performance Monitoring

Add APM tools:
- New Relic
- DataDog
- Sentry for error tracking

## Scaling

### Horizontal Scaling

```bash
# With Docker Compose
docker-compose up -d --scale backend=3
```

### Load Balancing

Add Nginx as reverse proxy:

```nginx
upstream backend {
  server backend:5000;
  server backend:5001;
  server backend:5002;
}

server {
  listen 80;
  location /api {
    proxy_pass http://backend;
  }
}
```

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process using port
lsof -i :5000
kill -9 <PID>
```

### Database Connection Issues

```bash
# Test MongoDB connection
mongo --uri "mongodb://admin:password@localhost:27017/webbrowser"
```

### Service Not Starting

```bash
# Check logs
docker-compose logs -f [service-name]

# Rebuild images
docker-compose build --no-cache
```

## Performance Tips

1. **Use CDN** for static assets
2. **Enable GZIP** compression
3. **Optimize database queries** with indexes
4. **Cache frequently accessed data** with Redis
5. **Use connection pooling** for database
6. **Monitor resource usage** and scale accordingly
7. **Implement rate limiting** to prevent abuse
8. **Use async/await** for non-blocking operations

## Security Checklist

- [ ] Change all default passwords
- [ ] Use HTTPS/SSL certificates
- [ ] Enable firewall rules
- [ ] Setup regular backups
- [ ] Use environment variables for secrets
- [ ] Enable authentication on all endpoints
- [ ] Implement rate limiting
- [ ] Keep dependencies updated
- [ ] Use strong JWT secret
- [ ] Enable CORS properly
- [ ] Setup monitoring and alerts
- [ ] Regular security audits
