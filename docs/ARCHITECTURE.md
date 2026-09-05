# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
│  (React + TypeScript + Tailwind CSS)                       │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API Server (Node.js)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Express.js Framework                                 │  │
│  │ - Authentication (JWT)                              │  │
│  │ - User Management                                   │  │
│  │ - History & Bookmarks                              │  │
│  │ - Search Proxy                                      │  │
│  │ - Rate Limiting & CORS                              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬─────────────────────────────┬──────────────────┘
             │                             │
             ▼                             ▼
    ┌─────────────────┐         ┌──────────────────────┐
    │   MongoDB       │         │  Python Search      │
    │   Database      │         │  Engine (Flask)     │
    │                 │         │                      │
    │ - Users         │         │ - Web Crawler       │
    │ - History       │         │ - Search Index      │
    │ - Bookmarks     │         │ - TF-IDF Ranking    │
    │ - Cache         │         │ - Suggestions       │
    └─────────────────┘         └──────────────────────┘
                                      │
                                      ▼
                                ┌──────────────┐
                                │ WWW (Internet)│
                                │ Web Pages    │
                                └──────────────┘
```

## Component Breakdown

### Frontend (React)

**Location**: `frontend/src/`

**Key Components**:
- `App.tsx` - Main application component with routing
- `context/BrowserContext.tsx` - Global browser state management
- `pages/` - Page-level components (Auth, Home, etc.)
- `components/` - Reusable UI components
  - `Navigation.tsx` - URL bar and navigation
  - `TabBar.tsx` - Tab management
  - `SearchEngine.tsx` - Search interface
  - `Bookmarks.tsx` - Bookmarks manager
  - `History.tsx` - History viewer
  - `Settings.tsx` - User settings
  - `Sidebar.tsx` - Navigation sidebar

**Technologies**:
- React 18
- TypeScript
- Tailwind CSS
- React Router (v6)
- Axios for API calls

### Backend API (Node.js/Express)

**Location**: `backend/src/`

**Architecture**:
```
backend/
├── src/
│   ├── index.ts              # Main server file
│   ├── models/              # MongoDB schemas
│   │   ├── User.ts
│   │   ├── History.ts
│   │   └── Bookmark.ts
│   ├── routes/              # API route handlers
│   │   ├── auth.ts
│   │   ├── history.ts
│   │   ├── bookmarks.ts
│   │   └── search.ts
│   └── middleware/          # Express middleware
│       ├── auth.ts          # JWT authentication
│       └── validation.ts    # Input validation
├── Dockerfile
└── package.json
```

**Key Features**:
- RESTful API design
- JWT-based authentication
- MongoDB integration with Mongoose
- Input validation and error handling
- CORS and security headers (Helmet.js)
- Rate limiting
- Request logging (Morgan)

**API Routes**:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET/POST /api/history` - Manage browsing history
- `GET/POST/PUT/DELETE /api/bookmarks` - Manage bookmarks
- `GET /api/search` - Forward search queries

### Search Engine (Python/Flask)

**Location**: `search-engine/`

**Components**:
- `app.py` - Flask server
- `crawler.py` - Web crawling module
- `search_index.py` - Search indexing and ranking

**Architecture**:
```python
WebCrawler
├── fetch_page()      # Fetch HTML from URL
├── parse_page()      # Extract metadata
├── extract_links()   # Get links from page
└── crawl()           # Recursive crawling

SearchIndex
├── tokenize()            # Text tokenization
├── index_page()          # Add page to index
├── calculate_tf_idf()    # Compute rankings
└── search()              # Execute search
```

**Key Features**:
- Web crawling with depth control
- Full-text search indexing
- TF-IDF ranking algorithm
- Search suggestions
- HTML parsing and link extraction
- MongoDB integration

### Database (MongoDB)

**Collections**:

#### Users
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  profileImage: String,
  theme: String,
  preferences: {
    safeSearch: Boolean,
    autoComplete: Boolean,
    privateMode: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### History
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref User),
  url: String,
  title: String,
  description: String,
  favicon: String,
  visitedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Bookmarks
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref User),
  url: String,
  title: String,
  description: String,
  favicon: String,
  folder: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

### Search Flow
```
1. User enters search query in Frontend
        ↓
2. Frontend sends GET request to Backend (/api/search?q=...)
        ↓
3. Backend forwards request to Search Engine (/search?q=...)
        ↓
4. Search Engine queries in-memory index
        ↓
5. Search results returned to Backend
        ↓
6. Backend returns results to Frontend
        ↓
7. Frontend displays results
```

### Bookmark Flow
```
1. User clicks bookmark button in Browser
        ↓
2. Frontend shows bookmark form
        ↓
3. User submits form
        ↓
4. Frontend sends POST to Backend (/api/bookmarks)
        ↓
5. Backend validates and saves to MongoDB
        ↓
6. Frontend updates bookmark list
```

### Authentication Flow
```
1. User enters credentials on login page
        ↓
2. Frontend sends POST to Backend (/api/auth/login)
        ↓
3. Backend validates credentials against MongoDB
        ↓
4. Backend generates JWT token
        ↓
5. Frontend stores token in localStorage
        ↓
6. Frontend includes token in Authorization header for all requests
```

## Security

- **Authentication**: JWT tokens with 7-day expiry
- **Password**: Bcryptjs hashing with 10 salt rounds
- **CORS**: Configured to allow frontend origin only
- **Headers**: Helmet.js for security headers
- **Rate Limiting**: 100 requests per 15 minutes
- **Input Validation**: Express-validator for all inputs
- **HTTPS**: Recommended for production

## Performance Optimizations

- **Caching**: Search results cached in MongoDB
- **Indexing**: Database indexes on frequently queried fields
- **Pagination**: History and bookmarks use pagination
- **Lazy Loading**: Frontend components loaded on demand
- **Bundle Optimization**: Webpack code splitting
- **Database Queries**: Optimized with projection and filtering

## Scalability

- **Horizontal Scaling**: Stateless backend can be load-balanced
- **Database Replication**: MongoDB replica sets for HA
- **Caching Layer**: Redis can be added for session/search cache
- **CDN**: Static assets can be served from CDN
- **Microservices**: Search engine can be separated to different servers

## Deployment

- **Docker**: Multi-container setup with Docker Compose
- **Environment Variables**: Configuration via .env files
- **Volumes**: Data persistence for MongoDB
- **Networking**: Internal Docker network for service communication

## Monitoring & Logging

- **Morgan**: HTTP request logging
- **Console Logs**: Debug and error logging
- **Error Handling**: Centralized error middleware
- **Health Checks**: `/health` endpoint on backend and search engine
