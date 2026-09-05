# Frontend - React Web Browser UI

A modern, responsive web browser interface built with React and TypeScript.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔍 Search bar with real-time suggestions
- 📑 Tab management system
- 🏠 History & Bookmarks
- 🌓 Dark/Light theme toggle
- ⚙️ Settings panel
- 📱 Fully responsive design
- ♿ Accessibility support

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local`:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SEARCH_ENGINE_URL=http://localhost:8000
```

### Development

```bash
npm start
```

Opens http://localhost:3000

### Production Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Browser/
│   │   ├── SearchBar/
│   │   ├── TabManager/
│   │   ├── Sidebar/
│   │   └── Settings/
│   ├── pages/
│   │   ├── Home/
│   │   ├── SearchResults/
│   │   └── Settings/
│   ├── hooks/
│   │   ├── useBrowser.ts
│   │   ├── useSearch.ts
│   │   └── useTheme.ts
│   ├── context/
│   │   └── BrowserContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── storage.ts
│   │   └── history.ts
│   ├── styles/
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── Dockerfile
```

## Key Dependencies

- React 18
- React Router v6
- TypeScript
- Tailwind CSS
- Axios
- Redux Toolkit
- React Query

## API Integration

All API calls go through `services/api.ts`:

```typescript
// Search
const results = await api.search(query);

// History
const history = await api.getHistory();
await api.addHistory(url);

// Bookmarks
const bookmarks = await api.getBookmarks();
await api.addBookmark(bookmark);

// Suggestions
const suggestions = await api.getSuggestions(query);
```

## Styling

Using Tailwind CSS with custom theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
      }
    }
  }
}
```

## Testing

```bash
npm test
```

## Docker

Build and run:

```bash
docker build -t webbrowser-frontend .
docker run -p 3000:3000 webbrowser-frontend
```

---

See [API Documentation](../docs/API.md) for backend integration details.
