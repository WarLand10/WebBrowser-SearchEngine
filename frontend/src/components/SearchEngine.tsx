import React, { useState } from 'react';
import { Search, Mic, Smile } from 'lucide-react';

const SearchEngine: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web..."
            className="flex-1 ml-4 outline-none text-lg"
          />
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <Mic size={20} className="text-gray-600" />
          </button>
        </div>
      </form>

      {/* Results */}
      {isSearching && (
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      )}

      <div className="space-y-6">
        {results.map((result, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <p className="text-green-600 text-sm">{result.url}</p>
            <h3 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer">
              {result.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{result.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEngine;
