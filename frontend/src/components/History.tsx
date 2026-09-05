import React, { useState, useEffect } from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  visitedAt: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setHistory(data.history);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/history/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(history.filter(h => h.id !== id));
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all history?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/history/clear/all', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock size={24} className="text-blue-600" />
          History
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No history yet</p>
      ) : (
        <div className="space-y-3">
          {history.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">{item.url}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.visitedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-100 rounded transition text-red-600 ml-4"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
