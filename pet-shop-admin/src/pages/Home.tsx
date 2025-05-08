import React from "react";
import StatsCard from "../components/home/StatsCard";
import SalesChart from "../components/home/SalesChart";

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Monthly Earnings" value="$5,000" />
        <StatsCard title="Total Products" value="120" />
        <StatsCard title="New Customers" value="25" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <SalesChart />
      </div>
    </div>
  );
};

export default Home;
