import React, { useState, useEffect } from "react";
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
        const blogResponse = await axios.get(
          `http://localhost:3000/blogs/${id}`
        );
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
      navigator
        .share({
          title: blog?.title || "Blog Post",
          url: window.location.href,
        })
        .catch((error) => {
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
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader />
      </section>
    );
  }

  // Render error or no blog found
  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600 text-lg sm:text-xl">
          Blog not found. Please try another article.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 mt-16 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
              <div
                onClick={() => navigate("/blogs")}
                className="flex justify-start"
              >
                <button className="flex justify-center items-center relative group bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-red-600 hover:shadow-md transition-all text-sm sm:text-base font-medium overflow-hidden">
                  <ArrowLeft></ArrowLeft>
                  <span className="relative z-10">Back to Blogs</span>
                </button>
              </div>

        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          {/* Blog Image */}
          <div className="mb-6">
            <img
              src={blog.image || "/api/placeholder/800/400"}
              alt={blog.title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Blog Metadata */}
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
            {blog.category && (
              <>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1 text-red-600" />
                  <span>{blog.category}</span>
                </div>
                <span className="hidden sm:block mx-2">•</span>
              </>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-red-600" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <span className="hidden sm:block mx-2">•</span>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-red-600" />
              <span>{blog.author || "Unknown Author"}</span>
            </div>
          </div>

          {/* Blog Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {blog.title || "Untitled"}
          </h1>

          {/* Blog Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-red-600 font-medium text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div
            className="prose prose-sm sm:prose-base max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: getBlogContent(blog) }}
          />

          {/* Share Button */}
          <div className="mt-8">
            <FancyButton
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </FancyButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        .prose {
          --tw-prose-body: #374151;
          --tw-prose-headings: #1f2937;
          --tw-prose-links: #2563eb;
          --tw-prose-bold: #1f2937;
          --tw-prose-quotes: #374151;
          --tw-prose-code: #2563eb;
          --tw-prose-pre-bg: #f3f4f6;
          --tw-prose-pre-code: #374151;
        }
      `}</style>
    </section>
  );
};

export default BlogDetails;