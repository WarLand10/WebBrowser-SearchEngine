import React, { useState } from 'react';
import { Bookmark, History, Settings, Menu, X } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems = [
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: History, label: 'History', id: 'history' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className={`flex transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    } bg-gray-900 text-white flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="font-bold text-lg">Menu</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => setActiveSection(activeSection === id ? null : id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === id
                ? 'bg-blue-600'
                : 'hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            {isOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Quick Info */}
      {isOpen && (
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          <p>WebBrowser v1.0</p>
          <p>© 2024</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
