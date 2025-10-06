import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Fetch blogs from the server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogsResponse = await axios.get(
          "https://projukti-sheba-server.onrender.com/blogs"
        );
        if (blogsResponse.data.success) {
          // Sort blogs by creation date, newest first
          const sortedBlogs = blogsResponse.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBlogs(sortedBlogs);
        } else {
          throw new Error(blogsResponse.data.error || "Failed to fetch blogs");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to strip HTML tags for description preview
  const stripHTMLTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Navigate to blog detail page
  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
          <span className="ml-3 text-lg">Loading blogs...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-red-600">
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl lg:mt-20 mt-10 mx-auto px-6 py-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Blog & Insights
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        Explore our latest insights on SEO, thought leadership, and digital
        marketing to stay ahead in the digital landscape.
      </p>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => {
          const plainText = stripHTMLTags(blog.expert || blog.content);
          const shortDescription =
            plainText.length > 100
              ? `${plainText.substring(0, 100)}...`
              : plainText;

          return (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={blog.image || "https://via.placeholder.com/400x250"}
                alt={blog.title}
                className="w-full h-48 object-cover flex-shrink-0"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                  {shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-400">
                    {formatDate(blog.createdAt)}
                  </p>
                  <button
                    onClick={() => handleReadMore(blog._id)}
                    className="flex items-center text-red-700 cursor-pointer font-medium hover:underline text-sm"
                  >
                    Read More →
                  </button>
                </div>
                {/* Tags display */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t">
                    {blog.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-gray-500 self-center">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Blogs Message */}
      {blogs.length === 0 && !loading && (
        <div className="text-center py-12 col-span-full">
          <p className="text-gray-500 text-lg">No blogs available yet.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md text-sm hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 inline" /> Prev
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === idx + 1
                  ? "bg-red-700 text-white"
                  : "hover:bg-red-700 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md text-sm hover:bg-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronLeft className="h-4 w-4 inline rotate-180" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;