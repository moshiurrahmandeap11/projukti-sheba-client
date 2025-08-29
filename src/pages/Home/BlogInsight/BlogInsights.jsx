import React, { useState } from "react";
import { Search, Tag, Calendar, User, ArrowRight } from "lucide-react";
import FancyButton from "../../../comopnents/sharedItems/FancyButtons/FancyButton";

const BlogInsights = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const blogs = [
    {
      id: 1,
      title: "Mastering SEO in 2025: Strategies for Higher Rankings",
      excerpt:
        "Discover the latest SEO techniques to boost your website’s visibility, including AI-driven optimization and voice search strategies.",
      author: "Rashid Ahmed",
      date: "August 10, 2025",
      category: "SEO",
      image: "/api/placeholder/400/250",
      slug: "/blog/mastering-seo-2025",
      tags: ["SEO", "Digital Marketing", "AI"],
    },
    {
      id: 2,
      title: "Thought Leadership: Building Trust in the Digital Age",
      excerpt:
        "Learn how thought leadership content can establish your brand as an industry authority and drive long-term customer loyalty.",
      author: "Sarah Khan",
      date: "July 15, 2025",
      category: "Thought Leadership",
      image: "/api/placeholder/400/250",
      slug: "/blog/thought-leadership-digital-age",
      tags: ["Thought Leadership", "Branding"],
    },
    {
      id: 3,
      title: "Case Study: 300% Traffic Growth with SEO Overhaul",
      excerpt:
        "How Projukti Sheba helped a client achieve a 300% increase in organic traffic through technical SEO and content optimization.",
      author: "Mohammad Rahman",
      date: "June 20, 2025",
      category: "SEO",
      image: "/api/placeholder/400/250",
      slug: "/blog/seo-case-study-traffic-growth",
      tags: ["SEO", "Case Study", "Content Marketing"],
    },
    {
      id: 4,
      title: "The Future of Digital Marketing: Trends to Watch",
      excerpt:
        "Explore emerging trends in digital marketing, from personalized campaigns to leveraging big data for better ROI.",
      author: "Fatima Begum",
      date: "May 5, 2025",
      category: "Digital Marketing",
      image: "/api/placeholder/400/250",
      slug: "/blog/future-digital-marketing",
      tags: ["Digital Marketing", "Trends", "Big Data"],
    },
    {
      id: 5,
      title: "Why Thought Leadership Matters for SMEs",
      excerpt:
        "Small and medium enterprises can compete with industry giants by publishing authoritative content. Here’s how to start.",
      author: "Aminul Islam",
      date: "April 12, 2025",
      category: "Thought Leadership",
      image: "/api/placeholder/400/250",
      slug: "/blog/thought-leadership-smes",
      tags: ["Thought Leadership", "SME", "Content Strategy"],
    },
  ];

  const categories = ["All", "SEO", "Thought Leadership", "Digital Marketing"];

  // Filter blogs based on category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(10,25,47,0.3)] backdrop-blur-lg relative overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(10,25,47,0.5), rgba(50,40,130,0.4), rgba(0,120,160,0.3))', 
          zIndex: 0, 
          backdropFilter: 'blur(10px)' 
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(0,120,160,0.7))'
              }}
            >
              Blog & Insights
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our latest insights on SEO, thought leadership, and digital
            marketing to stay ahead in the digital landscape.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)] rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)]"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border ${
                    selectedCategory === category
                      ? 'bg-[rgba(0,120,160,0.5)] border-[rgba(0,120,160,0.5)] text-white'
                      : 'border-[rgba(255,255,255,0.1)] text-gray-300 hover:bg-[rgba(10,25,47,0.6)] hover:border-[rgba(0,120,160,0.5)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredBlogs.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Featured Article
            </h3>
            <div className="backdrop-blur-xl bg-[rgba(10,25,47,0.5)] rounded-3xl p-8 border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.2)] max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={filteredBlogs[0].image}
                    alt={filteredBlogs[0].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                    {filteredBlogs[0].category}
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                    {filteredBlogs[0].date}
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                    {filteredBlogs[0].author}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                    {filteredBlogs[0].title}
                  </h4>
                  <p className="text-gray-300 mb-6">
                    {filteredBlogs[0].excerpt}
                  </p>
                  <FancyButton>
                    <a
                      href={filteredBlogs[0].slug}
                      className="inline-flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </FancyButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:bg-[rgba(10,25,47,0.6)] hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Tag className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                {blog.category}
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mr-1 text-[rgba(0,120,160,0.8)]" />
                {blog.date}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 hover:text-[rgba(0,120,160,0.8)] transition-colors duration-300">
                {blog.title}
              </h4>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">By {blog.author}</span>
                <a
                  href={blog.slug}
                  className="text-[rgba(0,120,160,0.8)] text-sm font-medium hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
          {filteredBlogs.length === 0 && (
            <p className="text-center text-gray-400 col-span-full">
              No articles found. Try adjusting your search or category.
            </p>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-lg bg-[rgba(10,25,47,0.5)] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] max-w-3xl mx-auto shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Ahead with Our Insights
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Subscribe to our newsletter for the latest SEO tips, thought
              leadership content, and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 backdrop-blur-md bg-[rgba(10,25,47,0.5)] border border-[rgba(255,255,255,0.1)] rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(0,120,160,0.5)]"
              />
              <FancyButton>
                <span>Subscribe</span>
              </FancyButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default BlogInsights;