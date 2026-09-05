# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "theme": "light",
  "preferences": {
    "safeSearch": true,
    "autoComplete": true,
    "privateMode": false
  }
}
```

### History

#### Get History
```http
GET /history?limit=50&skip=0
Authorization: Bearer <token>

Response: 200 OK
{
  "history": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "url": "https://example.com",
      "title": "Example Domain",
      "visitedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 156
}
```

#### Add to History
```http
POST /history
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "Example Domain description",
  "favicon": "https://example.com/favicon.ico"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "url": "https://example.com",
  "title": "Example Domain",
  "visitedAt": "2024-01-15T10:30:00Z"
}
```

#### Delete History Item
```http
DELETE /history/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "History item deleted"
}
```

#### Clear All History
```http
DELETE /history/clear/all
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "All history cleared"
}
```

### Bookmarks

#### Get Bookmarks
```http
GET /bookmarks?folder=General
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "url": "https://github.com",
    "title": "GitHub",
    "folder": "Development",
    "tags": ["code", "git"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Create Bookmark
```http
POST /bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://github.com",
  "title": "GitHub",
  "description": "Where the world builds software",
  "folder": "Development",
  "tags": ["code", "git"]
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "url": "https://github.com",
  "title": "GitHub",
  "folder": "Development",
  "tags": ["code", "git"],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update Bookmark
```http
PUT /bookmarks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "GitHub - Updated",
  "folder": "Coding"
}

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439013",
  "url": "https://github.com",
  "title": "GitHub - Updated",
  "folder": "Coding"
}
```

#### Delete Bookmark
```http
DELETE /bookmarks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Bookmark deleted"
}
```

### Search

#### Search
```http
GET /search?q=python&page=1

Response: 200 OK
{
  "query": "python",
  "results": [
    {
      "url": "https://python.org",
      "title": "Welcome to Python.org",
      "content": "The official home of the Python Programming Language...",
      "score": 0.95
    }
  ],
  "total": 1000000,
  "page": 1
}
```

#### Get Suggestions
```http
GET /search/suggestions?q=python

Response: 200 OK
{
  "query": "python",
  "suggestions": [
    "python programming",
    "python tutorial",
    "python documentation",
    "python download"
  ]
}
```

### User

#### Get Preferences
```http
GET /user/preferences
Authorization: Bearer <token>

Response: 200 OK
{
  "theme": "light",
  "safeSearch": true,
  "autoComplete": true,
  "privateMode": false
}
```

#### Update Preferences
```http
PUT /user/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "theme": "dark",
  "safeSearch": false,
  "autoComplete": true,
  "privateMode": true
}

Response: 200 OK
{
  "message": "Preferences updated",
  "preferences": {
    "theme": "dark",
    "safeSearch": false,
    "autoComplete": true,
    "privateMode": true
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Search query is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

## Rate Limiting

- Limit: 100 requests per 15 minutes per IP
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
