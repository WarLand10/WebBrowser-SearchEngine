import React, { useState } from 'react';
import { Search, Bookmark, History, Settings, Menu, LogOut } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Mock search results
    setResults([
      {
        title: 'React - A JavaScript library for building user interfaces',
        url: 'https://react.dev',
        description: 'React is a JavaScript library for building user interfaces with reusable components.'
      },
      {
        title: 'GitHub - Where the world builds software',
        url: 'https://github.com',
        description: 'GitHub is where over 100 million developers shape the future of software.'
      },
      {
        title: 'TypeScript: Typed Superset of JavaScript',
        url: 'https://www.typescriptlang.org',
        description: 'TypeScript is a strongly typed programming language that builds on JavaScript.'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🌐</div>
              <h1 className="text-3xl font-bold">WebBrowser</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">
                <Menu size={20} />
              </button>
              <button 
                onClick={() => setIsAuthenticated(!isAuthenticated)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                <LogOut size={20} />
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the web..."
                  className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute right-4 top-3 text-gray-400" size={20} />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 flex gap-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-4 px-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'search'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search size={18} /> Search
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-4 px-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'bookmarks'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bookmark size={18} /> Bookmarks
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <History size={18} /> History
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-2 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'search' && (
          <div>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to search?</h2>
                <p className="text-gray-600">Enter a search term above to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm hover:underline">
                      {result.url}
                    </a>
                    <h3 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer mt-1">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{result.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bookmark size={24} className="text-yellow-500" />
              Your Bookmarks
            </h2>
            <p className="text-gray-600">No bookmarks yet. Start by bookmarking your favorite websites!</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <History size={24} className="text-blue-600" />
              Browsing History
            </h2>
            <p className="text-gray-600">Your browsing history will appear here</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Settings size={24} className="text-gray-600" />
              Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span>Enable Safe Search</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span>Show Suggestions</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>Private Mode</span>
              </label>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 WebBrowser. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
