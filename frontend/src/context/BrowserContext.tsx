import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isLoading: boolean;
}

interface BrowserContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export const BrowserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      url: 'https://www.google.com',
      title: 'Home',
      isLoading: false
    }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('1');

  const addTab = (url: string = 'about:blank') => {
    const newTab: Tab = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      title: 'New Tab',
      isLoading: true
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    
    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs(tabs.map(tab => tab.id === id ? { ...tab, ...updates } : tab));
  };

  return (
    <BrowserContext.Provider value={{
      tabs,
      activeTabId,
      addTab,
      closeTab,
      setActiveTab: setActiveTabId,
      updateTab
    }}>
      {children}
    </BrowserContext.Provider>
  );
};

export const useBrowser = () => {
  const context = useContext(BrowserContext);
  if (!context) {
    throw new Error('useBrowser must be used within BrowserProvider');
  }
  return context;
};
