import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

interface UserPreferences {
  theme: 'light' | 'dark';
  safeSearch: boolean;
  autoComplete: boolean;
  privateMode: boolean;
}

const Settings: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    safeSearch: true,
    autoComplete: true,
    privateMode: false
  });

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  const savePreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      });
      alert('Preferences saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SettingsIcon size={24} />
        Settings
      </h2>

      {/* Theme Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              preferences.theme === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Sun size={20} />
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              preferences.theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Moon size={20} />
            Dark
          </button>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Privacy & Safety</h3>
        <div className="space-y-3">
          {[
            { key: 'safeSearch', label: 'Safe Search' },
            { key: 'autoComplete', label: 'Auto-complete Suggestions' },
            { key: 'privateMode', label: 'Private Mode' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences[key as keyof UserPreferences] as boolean}
                onChange={() => handleToggle(key as keyof UserPreferences)}
                className="w-5 h-5 rounded"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={savePreferences}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Settings;
