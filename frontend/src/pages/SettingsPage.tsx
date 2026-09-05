import React from 'react';
import Navigation from '../components/Navigation';
import TabBar from '../components/TabBar';
import Settings from '../components/Settings';
import Sidebar from '../components/Sidebar';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navigation />
      <TabBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <Settings />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
