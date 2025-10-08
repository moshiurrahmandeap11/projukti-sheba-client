import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { FileText } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnalyticsSection = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Refs for chart containers
  const visitorChartRef = useRef(null);
  const geoChartRef = useRef(null);
  const deviceChartRef = useRef(null);
  const exitPageChartRef = useRef(null);
  const funnelChartRef = useRef(null);
  const sourcesChartRef = useRef(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/analytics?startDate=${startDate}&endDate=${endDate}`);
      const result = await response.json();
      if (result.success) {
        // Ensure analyticsData has all required properties with fallbacks
        setAnalyticsData({
          newUsers: result.data.newUsers || 0,
          returningUsers: result.data.returningUsers || 0,
          geo: result.data.geo || {},
          devices: result.data.devices || {},
          exitPages: result.data.exitPages || {},
          funnel: result.data.funnel || { visitors: 0, leads: 0, clients: 0 },
          sources: result.data.sources || {},
          avgSessionDuration: result.data.avgSessionDuration || 0,
        });
      } else {
        console.error('Failed to fetch analytics:', result.message);
        setAnalyticsData(null);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error.message);
      setAnalyticsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [startDate, endDate]);

  // Export to PDF
  const exportToPDF = async () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(181, 0, 13); // #B5000D
    doc.text("Analytics & Reports", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 28);

    let yPosition = 38;

    if (!analyticsData) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("No analytics data available", 14, yPosition);
      doc.save(`analytics_report_${new Date().toISOString().slice(0, 10)}.pdf`);
      return;
    }

    // Helper function to add section header
    const addSectionHeader = (title) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(181, 0, 13); // #B5000D
      doc.text(title, 14, yPosition);
      yPosition += 8;
    };

    // Helper function to add chart image
    const addChartImage = async (chartRef, width = 180, height = 90) => {
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 14, yPosition, width, height);
        yPosition += height + 10;
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      }
    };

    // Helper function to add textual data
    const addTable = (labels, data, columnTitle) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      labels.forEach((label, index) => {
        const splitText = doc.splitTextToSize(`${columnTitle}: ${label} | Value: ${data[index] || 0}`, 180);
        doc.text(splitText, 14, yPosition);
        yPosition += splitText.length * 6 + 2;
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      yPosition += 4;
    };

    // Visitor Types
    addSectionHeader("Visitor Types");
    await addChartImage(visitorChartRef);
    addTable(
      ["New Users", "Returning Users"],
      [analyticsData.newUsers, analyticsData.returningUsers],
      "Type"
    );

    // Users by Country
    addSectionHeader("Users by Country");
    await addChartImage(geoChartRef);
    addTable(Object.keys(analyticsData.geo), Object.values(analyticsData.geo), "Country");

    // Device Usage
    addSectionHeader("Device Usage");
    await addChartImage(deviceChartRef);
    addTable(Object.keys(analyticsData.devices), Object.values(analyticsData.devices), "Device");

    // Exit Pages
    addSectionHeader("Exit Pages");
    await addChartImage(exitPageChartRef);
    addTable(Object.keys(analyticsData.exitPages), Object.values(analyticsData.exitPages), "Page");

    // Funnel Analysis
    addSectionHeader("Funnel Analysis (Visitors → Leads → Clients)");
    await addChartImage(funnelChartRef);
    addTable(
      ["Visitors", "Leads", "Clients"],
      [
        analyticsData.funnel.visitors,
        analyticsData.funnel.leads,
        analyticsData.funnel.clients,
      ],
      "Stage"
    );

    // Visitor Sources
    addSectionHeader("Visitor Sources");
    await addChartImage(sourcesChartRef);
    addTable(Object.keys(analyticsData.sources), Object.values(analyticsData.sources), "Source");

    // Average Session Duration
    addSectionHeader("Average Session Duration");
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Duration: ${Math.round(analyticsData.avgSessionDuration)} seconds`, 14, yPosition);
    yPosition += 10;

    // Add separator line at the end
    doc.setDrawColor(181, 0, 13); // #B5000D
    doc.line(14, yPosition, 196, yPosition);

    const fileName = `analytics_report_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              View and analyze user engagement data
            </p>
          </div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-8 sm:py-12 text-gray-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
                <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                  Loading Analytics...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (!analyticsData) {
    return (
      <motion.div
        className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              View and analyze user engagement data
            </p>
          </div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <div className="flex items-center justify-center py-8 sm:py-12 text-gray-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
                <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                  No Analytics Data
                </p>
                <p className="text-xs sm:text-sm">
                  Analytics will be available once you have data
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
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
    labels: Object.keys(analyticsData.geo || {}),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(analyticsData.geo || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const deviceChartData = {
    labels: Object.keys(analyticsData.devices || {}),
    datasets: [
      {
        label: "Device Usage",
        data: Object.values(analyticsData.devices || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const exitPageChartData = {
    labels: Object.keys(analyticsData.exitPages || {}),
    datasets: [
      {
        label: "Exit Pages",
        data: Object.values(analyticsData.exitPages || {}),
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
        data: [
          analyticsData.funnel?.visitors || 0,
          analyticsData.funnel?.leads || 0,
          analyticsData.funnel?.clients || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  const sourcesChartData = {
    labels: Object.keys(analyticsData.sources || {}),
    datasets: [
      {
        label: "Visitor Sources",
        data: Object.values(analyticsData.sources || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderColor: "#1F2937",
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 sm:mb-2">
                Analytics & Reports
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                View and analyze user engagement data
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <label className="text-gray-600 font-medium text-xs sm:text-sm">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/5 backdrop-blur-sm text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/40 text-xs sm:text-sm w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <label className="text-gray-600 font-medium text-xs sm:text-sm">
                  End Date:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/5 backdrop-blur-sm text-black px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#B5000D]/40 text-xs sm:text-sm w-full sm:w-auto"
                />
              </div>
              <button
                onClick={fetchAnalytics}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg text-xs sm:text-sm transition-colors duration-200 w-full sm:w-auto"
              >
                <span>Apply Filter</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-lg text-xs sm:text-sm transition-colors duration-200 w-full sm:w-auto"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Export to PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="max-h-64" ref={visitorChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Visitor Types
              </h3>
              <Bar
                data={visitorChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false }, 
                    tooltip: { enabled: true } 
                  },
                  scales: { 
                    y: { beginAtZero: true },
                    x: { ticks: { font: { size: 10 } } }
                  },
                }}
                height={150}
              />
            </div>
            <div className="max-h-64" ref={geoChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Users by Country
              </h3>
              <Pie
                data={geoChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: "right", 
                      labels: { font: { size: 8 } } 
                    }, 
                    tooltip: { enabled: true } 
                  },
                }}
                height={150}
              />
            </div>
            <div className="max-h-64" ref={deviceChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Device Usage
              </h3>
              <Pie
                data={deviceChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: "right", 
                      labels: { font: { size: 8 } } 
                    }, 
                    tooltip: { enabled: true } 
                  },
                }}
                height={150}
              />
            </div>
            <div className="max-h-64" ref={exitPageChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Exit Pages
              </h3>
              <Bar
                data={exitPageChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false }, 
                    tooltip: { enabled: true } 
                  },
                  scales: {
                    x: { 
                      ticks: { 
                        autoSkip: false, 
                        maxRotation: 45, 
                        minRotation: 45, 
                        font: { size: 8 } 
                      } 
                    },
                    y: { beginAtZero: true },
                  },
                }}
                height={150}
              />
            </div>
            <div className="max-h-64 sm:col-span-2" ref={funnelChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Funnel Analysis (Visitors → Leads → Clients)
              </h3>
              <Bar
                data={funnelChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false }, 
                    tooltip: { enabled: true } 
                  },
                  scales: { 
                    y: { beginAtZero: true },
                    x: { ticks: { font: { size: 8 } } }
                  },
                }}
                height={150}
              />
            </div>
            <div className="max-h-64 sm:col-span-2" ref={sourcesChartRef}>
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Visitor Sources
              </h3>
              <Pie
                data={sourcesChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: "right", 
                      labels: { font: { size: 8 } } 
                    }, 
                    tooltip: { enabled: true } 
                  },
                }}
                height={150}
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-sm sm:text-base font-medium text-black mb-2 sm:mb-3">
                Average Session Duration
              </h3>
              <p className="text-lg sm:text-xl font-bold text-black">
                {Math.round(analyticsData.avgSessionDuration)} seconds
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;