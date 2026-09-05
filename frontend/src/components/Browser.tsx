import React from 'react';
import Navigation from './Navigation';
import TabBar from './TabBar';
import Sidebar from './Sidebar';
import { useBrowser } from '../context/BrowserContext';

const Browser: React.FC = () => {
  const { tabs, activeTabId } = useBrowser();
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navigation />

      {/* Tab Bar */}
      <TabBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Browser Window */}
        <main className="flex-1 overflow-auto">
          {activeTab ? (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{activeTab.title}</h1>
                <p className="text-gray-600 mb-6">{activeTab.url}</p>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-500">
                    Content from {activeTab.url} will be displayed here
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-xl">No tabs open</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Browser;
