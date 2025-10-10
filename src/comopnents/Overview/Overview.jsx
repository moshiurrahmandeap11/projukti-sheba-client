import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";


const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span className="text-3xl md:text-4xl font-bold text-red-600">{count}</span>;
};

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/overview");
      
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError("Failed to load overview data");
        // Fallback to default data
        setStats([
          { label: "Total Projects", value: 128 },
          { label: "Happy Clients", value: 84 },
          { label: "Total Products", value: 256 },
          { label: "Countries Served", value: 12 },
        ]);
      }
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError("Failed to load overview data");
      // Fallback to default data
      setStats([
        { label: "Total Projects", value: 128 },
        { label: "Happy Clients", value: 84 },
        { label: "Total Products", value: 256 },
        { label: "Countries Served", value: 12 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="h-8 bg-gray-300 rounded w-20 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-32 mx-auto mt-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-bold text-black mb-6 tracking-wide">Overview</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Some key numbers that highlight our achievements.
        </p>
        {error && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <AnimatedNumber value={stat.value} />
            <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;