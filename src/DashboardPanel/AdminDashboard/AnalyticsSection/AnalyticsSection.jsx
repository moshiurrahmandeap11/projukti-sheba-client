import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js কম্পোনেন্ট রেজিস্টার করুন
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে ডেটা ফেচ করুন
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };
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

  // চার্টের জন্য ডেটা প্রস্তুত করুন
  const visitorChartData = {
    labels: ["New Users", "Returning Users"],
    datasets: [
      {
        label: "Visitors",
        data: [analyticsData.newUsers, analyticsData.returningUsers],
        backgroundColor: ["#4CAF50", "#2196F3"],
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
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* নতুন vs পুরাতন ভিজিটর */}
          <div>
            <h3 className="text-lg font-medium mb-4">Visitor Types</h3>
            <Bar
              data={visitorChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>

          {/* জিও লোকেশন */}
          <div>
            <h3 className="text-lg font-medium mb-4">Users by Country</h3>
            <Pie
              data={geoChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "right" } },
              }}
            />
          </div>

          {/* ডিভাইস টাইপ */}
          <div>
            <h3 className="text-lg font-medium mb-4">Device Usage</h3>
            <Pie
              data={deviceChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "right" } },
              }}
            />
          </div>

          {/* এক্সিট পেজ */}
          <div>
            <h3 className="text-lg font-medium mb-4">Exit Pages</h3>
            <Bar
              data={exitPageChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
                },
              }}
            />
          </div>

          {/* সেশন ডিউরেশন */}
          <div className="col-span-2">
            <h3 className="text-lg font-medium mb-4">Average Session Duration</h3>
            <p className="text-2xl font-bold">{Math.round(analyticsData.avgSessionDuration)} seconds</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsSection;