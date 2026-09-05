import React, { useState } from 'react';
import { useBrowser } from '../context/BrowserContext';
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Settings, Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  const { activeTabId, updateTab } = useBrowser();
  const [url, setUrl] = useState('https://www.google.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTabId) {
      updateTab(activeTabId, { url, title: new URL(url).hostname });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <ChevronRight size={20} />
          </button>
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <RotateCcw size={20} />
          </button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleNavigate} className="flex-1">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Search or enter URL..."
              className="flex-1 outline-none text-gray-800"
            />
            <button type="submit" className="text-blue-600 font-semibold ml-2">
              Go
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <Plus size={20} />
          </button>
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <Settings size={20} />
          </button>
          <button className="p-2 hover:bg-blue-500 rounded-lg transition">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
