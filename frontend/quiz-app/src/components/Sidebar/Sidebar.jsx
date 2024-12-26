import { useState, useEffect } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { SidebarHeader } from './components/SidebarHeader';
import { useWindowSize } from '../../hooks/useWindowSize';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsCollapsed(width < 768);
  }, [width]);

  return (
    <aside className={`fixed top-0 right-0 h-screen bg-white border-l border-gray-200 transition-all duration-300 z-50
      ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="h-full flex flex-col">
        <SidebarHeader isCollapsed={isCollapsed} />
        <SidebarNav isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};