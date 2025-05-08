import React from "react";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[280px] flex-1 p-6">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
