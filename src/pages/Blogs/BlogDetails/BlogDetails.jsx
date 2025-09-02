import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
import Loader from "../../../comopnents/sharedItems/Loader/Loader";
import FancyButton from "../../../comopnents/sharedItems/FancyButtons/FancyButton";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const blogResponse = await axios.get(`https://projukti-sheba-server.onrender.com/blogs/${id}`);
        if (blogResponse.data.success) {
          setBlog(blogResponse.data.data);
        } else {
          throw new Error(blogResponse.data.error || "Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast.error(error.message || "Failed to load blog details");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  // Strip HTML tags for plain text
  const stripHTMLTags = (html) => {
    if (!html) return "No content available";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "No content available";
  };

  // Get blog content
  const getBlogContent = (blog) => {
    return blog?.expert || blog?.content || "";
  };

  // Format date
  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || "Blog Post",
        url: window.location.href,
      }).catch((error) => {
        console.error("Error sharing:", error);
        toast.error("Failed to share the article");
      });
    } else {
      toast.error("Web Share API not supported in this browser");
    }
  };

  // Render loading state
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[rgba(10,25,47,0.3)] backdrop-blur-lg">
        <Loader />
      </section>
    );
  }

  // Render error or no blog found
  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[rgba(10,25,47,0.3)] backdrop-blur-lg">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 text-lg sm:text-xl"
        >
          Blog not found. Please try another article.
        </motion.p>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(10,25,47,0.3)] backdrop-blur-lg relative overflow-hidden min-h-screen">
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <FancyButton
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center space-x-2 text-[#B5000D] hover:text-[#B5000D]/80"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </FancyButton>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] rounded-3xl p-6 sm:p-8 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        >
          {/* Blog Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <img
              src={blog.image || "/api/placeholder/800/400"}
              alt={blog.title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
            />
          </motion.div>

          {/* Blog Metadata */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-400 mb-4 gap-2 sm:gap-4">
            {blog.category && (
              <>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                  <span>{blog.category}</span>
                </div>
                <span className="hidden sm:block mx-2">•</span>
              </>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <span className="hidden sm:block mx-2">•</span>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
              <span>{blog.author || "Unknown Author"}</span>
            </div>
          </div>

          {/* Blog Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))',
              }}
            >
              {blog.title || "Untitled"}
            </span>
          </h1>

          {/* Blog Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[rgba(0,120,160,0.2)] text-[rgba(0,120,160,0.8)] text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div
            className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: getBlogContent(blog) }}
          />

          {/* Share Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <FancyButton
              onClick={handleShare}
              className="inline-flex items-center space-x-2 text-[#B5000D] hover:text-[#B5000D]/80"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </FancyButton>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .prose-invert {
          --tw-prose-body: rgba(209, 213, 219, 0.9);
          --tw-prose-headings: rgba(255, 255, 255, 0.9);
          --tw-prose-links: rgba(0, 120, 160, 0.8);
          --tw-prose-bold: rgba(255, 255, 255, 0.9);
          --tw-prose-quotes: rgba(209, 213, 219, 0.9);
          --tw-prose-code: rgba(0, 120, 160, 0.8);
          --tw-prose-pre-bg: rgba(10, 25, 47, 0.8);
          --tw-prose-pre-code: rgba(209, 213, 219, 0.9);
        }
      `}</style>
    </section>
  );
};

export default BlogDetails;