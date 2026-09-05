import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';

interface Bookmark {
  id: string;
  url: string;
  title: string;
  folder: string;
}

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('All');

  useEffect(() => {
    // Fetch bookmarks from API
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(bookmarks.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const folders = ['All', ...new Set(bookmarks.map(b => b.folder))];
  const filteredBookmarks = selectedFolder === 'All' 
    ? bookmarks 
    : bookmarks.filter(b => b.folder === selectedFolder);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Star size={24} className="text-yellow-500" />
        Bookmarks
      </h2>

      {/* Folder Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {folders.map(folder => (
          <button
            key={folder}
            onClick={() => setSelectedFolder(folder)}
            className={`px-4 py-2 rounded-full transition ${
              selectedFolder === folder
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* Bookmarks List */}
      {loading ? (
        <p className="text-gray-500">Loading bookmarks...</p>
      ) : filteredBookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map(bookmark => (
            <div
              key={bookmark.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <h3 className="font-bold text-blue-600 hover:underline cursor-pointer">
                {bookmark.title}
              </h3>
              <p className="text-sm text-gray-600 truncate mt-1">{bookmark.url}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {bookmark.folder}
                </span>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="p-2 hover:bg-red-100 rounded transition text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
