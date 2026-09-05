# Search Engine - Python Web Crawler & Indexer

A powerful search engine built with Python for web crawling and indexing.

## Features

- 🕷️ Web crawling with depth control
- 📑 Full-text search indexing
- 🔍 TF-IDF ranking algorithm
- 💡 Search suggestions
- 🚀 Fast search results
- 🔗 Link extraction
- 📊 Page metadata extraction

## Setup

### Prerequisites
- Python 3.11+
- pip or conda

### Installation

```bash
cd search-engine
pip install -r requirements.txt
```

### Environment Variables

Create `.env` file:

```env
PORT=8000
MONGODB_URI=mongodb://admin:password@localhost:27017/webbrowser
MAX_CRAWL_DEPTH=3
MAX_PAGES_PER_DOMAIN=100
USER_AGENT=WebBrowser-SearchEngine/1.0
REQUEST_TIMEOUT=10
```

### Development

```bash
python app.py
```

Server runs on http://localhost:8000

### Production

```bash
gunicorn --bind 0.0.0.0:8000 --workers 4 app:app
```

## API Endpoints

### Search
```
GET /search?q=<query>&page=<page_number>
```

Response:
```json
{
  "query": "python programming",
  "results": [
    {
      "url": "https://example.com",
      "title": "Learn Python",
      "content": "...",
      "score": 0.95
    }
  ],
  "total": 1000,
  "page": 1
}
```

### Suggestions
```
GET /suggestions?q=<partial_query>
```

Response:
```json
{
  "query": "python",
  "suggestions": [
    "python programming",
    "python tutorial",
    "python documentation"
  ]
}
```

### Index Page
```
POST /index
Body:
{
  "url": "https://example.com",
  "title": "Page Title",
  "content": "Page content..."
}
```

## Components

### crawler.py
- `WebCrawler` - Web crawling and page parsing
- Extracts links, titles, descriptions
- Respects crawl depth limits

### search_index.py
- `SearchIndex` - Full-text search index
- TF-IDF ranking algorithm
- Document tokenization and scoring

## Architecture

```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Backend API    │
└──────┬──────────┘
       │
       ▼
┌──────────────────────────┐
│  Search Engine (Python)  │
│  ┌────────────────────┐  │
│  │  Web Crawler       │  │
│  ├────────────────────┤  │
│  │  Search Index      │  │
│  ├────────────────────┤  │
│  │  TF-IDF Ranker     │  │
│  └────────────────────┘  │
└──────┬───────────────────┘
       │
       ▼
┌─────────────────┐
│  MongoDB Index  │
└─────────────────┘
```

## Web Crawling

```python
from crawler import WebCrawler

crawler = WebCrawler(max_depth=3)
pages = crawler.crawl('https://example.com')

for page in pages:
    print(page['title'])
    print(page['url'])
    print(page['content'][:100])
```

## Searching

```python
from search_index import SearchIndex

index = SearchIndex()
# Index pages
index.index_page('1', 'Python Guide', 'Learn Python...', 'https://example.com')

# Calculate scores
index.calculate_tf_idf()

# Search
results = index.search('python', top_k=10)
```

## Docker

```bash
docker build -t webbrowser-search-engine .
docker run -p 8000:8000 --env-file .env webbrowser-search-engine
```

## Performance

- Supports indexing millions of pages
- Fast search queries (< 100ms)
- Efficient TF-IDF calculation
- MongoDB integration for persistence

## Future Enhancements

- [ ] Distributed crawling
- [ ] Machine learning ranking
- [ ] Image search
- [ ] News indexing
- [ ] Spell correction
- [ ] Query expansion
