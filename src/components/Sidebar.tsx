import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-48 bg-gray-100 h-full p-4 border-r">
      <nav className="space-y-2">
        <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
        <a href="#" className="block p-2 rounded hover:bg-gray-200">Lieferanten</a>
        <a href="#" className="block p-2 rounded hover:bg-gray-200">Berichte</a>
      </nav>
    </aside>
  );
};

export default Sidebar;