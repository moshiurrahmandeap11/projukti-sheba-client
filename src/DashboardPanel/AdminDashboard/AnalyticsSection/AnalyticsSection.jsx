import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://projukti-sheba-server.onrender.com/analytics?startDate=${startDate}&endDate=${endDate}`);
      const result = await response.json();
      if (result.success) {
        setAnalyticsData(result.data);
      } else {
        console.error('Failed to fetch analytics:', result.message);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-center py-12 text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-lg font-medium mb-2">Loading Analytics...</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-center py-12 text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-lg font-medium mb-2">No Analytics Data</p>
              <p className="text-sm">Analytics will be available once you have data</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const visitorChartData = {
    labels: ["New Users", "Returning Users"],
    datasets: [
      {
        label: "Visitors",
        data: [analyticsData.newUsers, analyticsData.returningUsers],
        backgroundColor: ["#4CAF50", "#2196F3"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const geoChartData = {
    labels: Object.keys(analyticsData.geo),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(analyticsData.geo),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const deviceChartData = {
    labels: Object.keys(analyticsData.devices),
    datasets: [
      {
        label: "Device Usage",
        data: Object.values(analyticsData.devices),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const exitPageChartData = {
    labels: Object.keys(analyticsData.exitPages),
    datasets: [
      {
        label: "Exit Pages",
        data: Object.values(analyticsData.exitPages),
        backgroundColor: "#36A2EB",
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const funnelChartData = {
    labels: ["Visitors", "Leads", "Clients"],
    datasets: [
      {
        label: "Funnel Stages",
        data: [analyticsData.funnel.visitors, analyticsData.funnel.leads, analyticsData.funnel.clients],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const sourcesChartData = {
    labels: Object.keys(analyticsData.sources),
    datasets: [
      {
        label: "Visitor Sources",
        data: Object.values(analyticsData.sources),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <label className="text-gray-300">Start Date:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
        />
        <label className="text-gray-300">End Date:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
        />
        <button 
          onClick={fetchAnalytics} 
          className="bg-[#B5000D] hover:bg-[#B5000D]/80 text-white px-4 py-2 rounded transition-colors"
        >
          Apply Filter
        </button>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="max-h-64">
            <h3 className="text-base font-medium mb-2">Visitor Types</h3>
            <Bar
              data={visitorChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                scales: { y: { beginAtZero: true } },
              }}
              height={150}
            />
          </div>
          <div className="max-h-64">
            <h3 className="text-base font-medium mb-2">Users by Country</h3>
            <Pie
              data={geoChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right", labels: { font: { size: 10 } } }, tooltip: { enabled: true } },
              }}
              height={150}
            />
          </div>
          <div className="max-h-64">
            <h3 className="text-base font-medium mb-2">Device Usage</h3>
            <Pie
              data={deviceChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right", labels: { font: { size: 10 } } }, tooltip: { enabled: true } },
              }}
              height={150}
            />
          </div>
          <div className="max-h-64">
            <h3 className="text-base font-medium mb-2">Exit Pages</h3>
            <Bar
              data={exitPageChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                scales: {
                  x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45, font: { size: 10 } } },
                  y: { beginAtZero: true },
                },
              }}
              height={150}
            />
          </div>
          <div className="max-h-64 md:col-span-2">
            <h3 className="text-base font-medium mb-2">Funnel Analysis (Visitors → Leads → Clients)</h3>
            <Bar
              data={funnelChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                scales: { y: { beginAtZero: true } },
              }}
              height={150}
            />
          </div>
          <div className="max-h-64 md:col-span-2">
            <h3 className="text-base font-medium mb-2">Visitor Sources</h3>
            <Pie
              data={sourcesChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "right", labels: { font: { size: 10 } } }, tooltip: { enabled: true } },
              }}
              height={150}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-base font-medium mb-2">Average Session Duration</h3>
            <p className="text-xl font-bold">{Math.round(analyticsData.avgSessionDuration)} seconds</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsSection;