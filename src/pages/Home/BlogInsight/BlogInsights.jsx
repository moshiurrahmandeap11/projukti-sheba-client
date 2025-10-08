import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Calendar, User, ArrowRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../comopnents/sharedItems/Loader/Loader";
import FancyButton from "../../../comopnents/sharedItems/FancyButtons/FancyButton";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blogs and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch blogs
        const blogsResponse = await axios.get("http://localhost:3000/blogs");
        if (blogsResponse.data.success) {
          setBlogs(blogsResponse.data.data);
        } else {
          throw new Error(blogsResponse.data.error || "Failed to fetch blogs");
        }

        // Fetch categories
        const categoriesResponse = await axios.get("http://localhost:3000/categories");
        setCategories([{ _id: "All", name: "All" }, ...categoriesResponse.data.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message || "Failed to load blogs or categories");
        setBlogs([]);
        setCategories([{ _id: "All", name: "All" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map category ID to name
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "N/A";
  };

  // Strip HTML tags and get plain text
  const stripHTMLTags = (html) => {
    if (!html) return "No content available";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "No content available";
  };

  // Get truncated text for preview
  const getTruncatedText = (html, maxLength = 150) => {
    const plainText = stripHTMLTags(html);
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + "..." 
      : plainText;
  };

  // Get content from blog (expert or content field)
  const getBlogContent = (blog) => {
    return blog.expert || blog.content || "";
  };

  // Filter blogs based on category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const content = getBlogContent(blog);
    const plainTextContent = stripHTMLTags(content);
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plainTextContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(10,25,47,0.3)] backdrop-blur-lg relative overflow-hidden">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(10,25,47,0.5), rgba(50,40,130,0.4), rgba(0,120,160,0.3))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))',
              }}
            >
              Blog & Insights
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
            Explore our latest insights on SEO, thought leadership, and digital marketing to stay ahead in the digital landscape.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)] rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)]"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border ${
                    selectedCategory === category._id
                      ? 'bg-[rgba(0,120,160,0.5)] border-[rgba(0,120,160,0.5)] text-white'
                      : 'border-[rgba(255,255,255,0.1)] text-gray-300 hover:bg-[rgba(10,25,47,0.6)] hover:border-[rgba(0,120,160,0.5)]'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Featured Post */}
            {filteredBlogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 sm:mb-16"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Featured Article
                </h3>
                <div className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] rounded-3xl p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-5xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={filteredBlogs[0].image || "/api/placeholder/400/250"}
                        alt={filteredBlogs[0].title}
                        className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-lg"
                      />
                    </motion.div>
                    <div>
                      <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-400 mb-4">
                        <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                        {getCategoryName(filteredBlogs[0].category)}
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                        {formatDate(filteredBlogs[0].createdAt)}
                        <span className="mx-2">•</span>
                        <User className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                        {filteredBlogs[0].author || "Unknown Author"}
                      </div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                        {filteredBlogs[0].title || "Untitled"}
                      </h4>
                      <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">
                        {getTruncatedText(getBlogContent(filteredBlogs[0]), 200)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredBlogs[0].tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[rgba(0,120,160,0.2)] text-[rgba(0,120,160,0.8)] text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <FancyButton>
                        <a
                          href={`/blog/${filteredBlogs[0].slug || filteredBlogs[0]._id}`}
                          className="inline-flex items-center space-x-2 text-[#B5000D] hover:text-[#B5000D]/80"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </FancyButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBlogs.slice(1).map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-4 sm:p-6 border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-[rgba(10,25,47,0.6)] hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                >
                  <img
                    src={blog.image || "/api/placeholder/400/250"}
                    alt={blog.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-400 mb-4">
                    <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                    {getCategoryName(blog.category)}
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                    {formatDate(blog.createdAt)}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300 line-clamp-2">
                    {blog.title || "Untitled"}
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3">
                    {getTruncatedText(getBlogContent(blog), 120)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[rgba(0,120,160,0.2)] text-[rgba(0,120,160,0.8)] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      By {blog.author || "Unknown Author"}
                    </span>
                    <a
                      href={`/blog/${blog.slug || blog._id}`}
                      className="text-[#B5000D] text-sm font-medium hover:underline flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
              {filteredBlogs.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-400 col-span-full py-8"
                >
                  No articles found. Try adjusting your search or category.
                </motion.p>
              )}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12 sm:mt-16"
            >
              <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] max-w-3xl mx-auto shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Stay Ahead with Our Insights
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg">
                  Subscribe to our newsletter for the latest SEO tips, thought leadership content, and industry updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 sm:py-3 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)] rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)]"
                  />
                  <FancyButton>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white rounded-full"
                    >
                      Subscribe
                    </motion.button>
                  </FancyButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

// Format date for display
const formatDate = (date) => {
  return date
    ? new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";
};

export default Blogs;