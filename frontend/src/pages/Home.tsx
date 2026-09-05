import React, { useState } from 'react';
import { Tab } from 'lucide-react';
import Navigation from '../components/Navigation';
import TabBar from '../components/TabBar';
import SearchEngine from '../components/SearchEngine';

const HomePage: React.FC = () => {
  const [activeView, setActiveView] = useState<'search' | 'browser'>('search');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🌐 WebBrowser Search Engine</h1>
          <p className="text-blue-100">Fast • Private • Powerful Search</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 flex gap-6">
          <button
            onClick={() => setActiveView('search')}
            className={`py-4 font-semibold border-b-2 transition ${
              activeView === 'search'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveView('browser')}
            className={`py-4 font-semibold border-b-2 transition flex items-center gap-2 ${
              activeView === 'browser'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Tab size={18} /> Browser
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {activeView === 'search' ? (
          <SearchEngine />
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Navigation />
            <TabBar />
            <div className="p-8 text-center text-gray-500">
              <p>Browser content will be loaded here</p>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <section className="bg-gray-800 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '🔍 Advanced Search',
                description: 'Lightning-fast search with TF-IDF ranking and real-time suggestions'
              },
              {
                title: '📚 Full Browser',
                description: 'Complete web browser with tabs, bookmarks, and history'
              },
              {
                title: '🛡️ Privacy First',
                description: 'Private mode, safe search, and no tracking of your activity'
              },
              {
                title: '⚡ Ultra Fast',
                description: 'Optimized performance with intelligent caching'
              },
              {
                title: '🎨 Beautiful UI',
                description: 'Modern, responsive design with dark/light theme support'
              },
              {
                title: '🔐 Secure',
                description: 'End-to-end encryption and secure authentication'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-700 p-6 rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
