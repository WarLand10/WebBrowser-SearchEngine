import React from 'react';
import { useBrowser } from '../context/BrowserContext';
import { X } from 'lucide-react';

const TabBar: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, closeTab, addTab } = useBrowser();

  return (
    <div className="flex items-center bg-gray-100 border-b border-gray-300 overflow-x-auto">
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 cursor-pointer border-r border-gray-300 transition ${
            activeTabId === tab.id
              ? 'bg-white border-b-2 border-blue-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {tab.favicon && <img src={tab.favicon} alt="" className="w-4 h-4" />}
          <span className="text-sm font-medium text-gray-700 max-w-xs truncate">
            {tab.title || 'New Tab'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="p-1 hover:bg-gray-300 rounded transition ml-2"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      
      <button
        onClick={() => addTab()}
        className="px-4 py-3 text-gray-600 hover:bg-gray-200 transition font-bold text-lg"
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
