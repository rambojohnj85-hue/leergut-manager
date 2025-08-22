import React from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Leergut Manager</h1>
          <p>Hier kommt deine App-Oberfläche hin 🚀</p>
        </main>
      </div>
    </div>
  );
};

export default App;