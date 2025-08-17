import React from 'react';
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react';

const Blogs = () => {
  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: 'The Future of Web Development in 2024',
      excerpt: 'Exploring the latest trends and technologies that will dominate web development this year and beyond.',
      author: 'John Doe',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Mastering React Performance Optimization',
      excerpt: 'Advanced techniques to make your React applications faster and more efficient.',
      author: 'Jane Smith',
      date: 'February 28, 2024',
      readTime: '8 min read',
      category: 'Development'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles for Modern Applications',
      excerpt: 'Essential design principles that every developer should know to create intuitive user experiences.',
      author: 'Alex Johnson',
      date: 'February 10, 2024',
      readTime: '6 min read',
      category: 'Design'
    },
    {
      id: 4,
      title: 'Building Scalable Backends with Node.js',
      excerpt: 'Learn how to architect Node.js applications that can handle millions of users.',
      author: 'Sarah Williams',
      date: 'January 22, 2024',
      readTime: '10 min read',
      category: 'Backend'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/10 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text ">
            Our Latest Insights
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover articles, tutorials and industry news from our team of experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-purple-500/20 hover:translate-y-[-5px]"
            >
              {/* Category Tag */}
              <div className="px-6 pt-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-900/30 rounded-full border border-purple-500/20">
                  {blog.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3">{blog.title}</h2>
                <p className="text-gray-400 mb-6">{blog.excerpt}</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="group flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest blog posts and industry news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;