import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
    BarChart3, BookOpen, Boxes, Building2, Bus, Car, 
    DollarSign, GraduationCap, Home, Hotel, LayoutGrid, 
    MessageCircle, MessageSquareText, MonitorSmartphone, 
    Newspaper, PenLine, Plane, Repeat, School, ShoppingCart, 
    Smartphone, UserCircle2, Users, Utensils, Search,
    Filter, ArrowRight, Star, CheckCircle2
} from 'lucide-react';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';


const ExploreAllSolutions = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = {
        'All': { icon: <LayoutGrid className="w-5 h-5" />, count: 0 },
        'ERP Solutions': { icon: <BarChart3 className="w-5 h-5" />, count: 0 },
        'E-commerce': { icon: <ShoppingCart className="w-5 h-5" />, count: 0 },
        'Restaurant': { icon: <Utensils className="w-5 h-5" />, count: 0 },
        'School': { icon: <School className="w-5 h-5" />, count: 0 },
        'Blog': { icon: <PenLine className="w-5 h-5" />, count: 0 },
        'Travel Agency': { icon: <Plane className="w-5 h-5" />, count: 0 },
        'Real Estate': { icon: <Home className="w-5 h-5" />, count: 0 },
        'Others': { icon: <Building2 className="w-5 h-5" />, count: 0 }
    };

    const iconComponents = {
        BarChart3, BookOpen, Boxes, Building2, Bus, Car, DollarSign,
        GraduationCap, Home, Hotel, LayoutGrid, MessageCircle,
        MessageSquareText, MonitorSmartphone, Newspaper, PenLine,
        Plane, Repeat, School, ShoppingCart, Smartphone,
        UserCircle2, Users, Utensils
    };

    const colorMap = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        pink: 'from-pink-500 to-pink-600',
        indigo: 'from-indigo-500 to-indigo-600',
        orange: 'from-orange-500 to-orange-600',
        rose: 'from-rose-500 to-rose-600',
        yellow: 'from-yellow-500 to-yellow-600',
        sky: 'from-sky-500 to-sky-600',
        violet: 'from-violet-500 to-violet-600',
        emerald: 'from-emerald-500 to-emerald-600',
        teal: 'from-teal-500 to-teal-600',
        gray: 'from-gray-500 to-gray-600'
    };

    // Fetch solutions from API
    const fetchSolutions = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/our-solutions');
            if (response.data.success) {
                // Transform API data to match our component structure
                const allSolutions = [];
                response.data.data.forEach(categoryData => {
                    categoryData.solutions.forEach(solution => {
                        allSolutions.push({
                            id: solution.id,
                            category: categoryData.category,
                            icon: solution.icon,
                            title: solution.title,
                            subtitle: solution.subtitle,
                            description: solution.description || solution.subtitle,
                            features: solution.features || [solution.subtitle],
                            popular: solution.popular || false,
                            color: solution.color || getRandomColor(),
                            link: solution.link || ''
                        });
                    });
                });
                setSolutions(allSolutions);
                
                // Update category counts
                updateCategoryCounts(allSolutions);
            } else {
                setSolutions([]);
            }
        } catch (error) {
            console.error('Error fetching solutions:', error);
            setSolutions([]);
        } finally {
            setLoading(false);
        }
    };

    // Update category counts based on actual data
    const updateCategoryCounts = (solutionsData) => {
        const counts = {
            'All': solutionsData.length,
            'ERP Solutions': 0,
            'E-commerce': 0,
            'Restaurant': 0,
            'School': 0,
            'Blog': 0,
            'Travel Agency': 0,
            'Real Estate': 0,
            'Others': 0
        };

        solutionsData.forEach(solution => {
            if (counts.hasOwnProperty(solution.category)) {
                counts[solution.category]++;
            }
        });

        // Update categories object
        Object.keys(categories).forEach(category => {
            categories[category].count = counts[category];
        });
    };

    // Get random color for solutions without specified color
    const getRandomColor = () => {
        const colors = Object.keys(colorMap);
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getColorClasses = (color) => {
        return colorMap[color] || 'from-gray-500 to-gray-600';
    };

    // Handle solution click with link navigation
    const handleSolutionClick = (solution) => {
        if (!solution.link) {
            navigate("/contact");
            return;
        }
        
        try {
            const isExternalLink = solution.link.startsWith('http://') || solution.link.startsWith('https://');
            
            if (isExternalLink) {
                // External link - open in new tab
                window.open(solution.link, '_blank', 'noopener,noreferrer');
            } else {
                // Internal link - navigate using react-router
                const internalPath = solution.link.replace(/^\/+|\/+$/g, '');
                navigate(`/${internalPath}`);
            }
        } catch (error) {
            console.error('Error handling link click:', error);
            // Fallback to contact page
            navigate("/contact");
        }
    };

    useEffect(() => {
        fetchSolutions();
    }, []);

    const filteredSolutions = solutions.filter(solution => {
        const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            solution.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            solution.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || solution.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="animate-pulse">
                                <div className="h-12 bg-gray-700 rounded w-96 mx-auto mb-6"></div>
                                <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto mb-8"></div>
                                <div className="h-14 bg-gray-700 rounded w-full max-w-2xl mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Categories */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="sticky top-8">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="animate-pulse">
                                        <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                            <div key={item} className="h-12 bg-gray-200 rounded mb-2"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Solutions Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                                        <div className="h-2 bg-gray-300"></div>
                                        <div className="p-6">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                                                <div className="flex-1">
                                                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                                                </div>
                                            </div>
                                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-4/6 mb-6"></div>
                                            <div className="space-y-2 mb-6">
                                                {[1, 2, 3].map((feature) => (
                                                    <div key={feature} className="h-4 bg-gray-300 rounded w-full"></div>
                                                ))}
                                            </div>
                                            <div className="h-10 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Explore Our Solutions
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
                            Discover comprehensive digital solutions tailored to transform your business and drive growth
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search solutions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Categories */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <Filter className="w-5 h-5 text-gray-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                                    <span className="ml-auto text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                                        {filteredSolutions.length} solutions
                                    </span>
                                </div>
                                
                                <div className="space-y-2">
                                    {Object.entries(categories).map(([category, { icon, count }]) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                                selectedCategory === category
                                                    ? 'bg-white shadow-md border border-gray-200 text-gray-900'
                                                    : 'text-gray-600 hover:bg-white hover:shadow-sm'
                                            }`}
                                        >
                                            {icon}
                                            <span className="flex-1 font-medium">{category}</span>
                                            <span className={`text-sm px-2 py-1 rounded-full ${
                                                selectedCategory === category
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}>
                                                {count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Solutions Grid */}
                    <div className="flex-1">
                        {filteredSolutions.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredSolutions.map((solution) => {
                                    const IconComponent = iconComponents[solution.icon] || BarChart3;
                                    
                                    return (
                                        <div
                                            key={solution.id}
                                            onMouseEnter={() => setHoveredCard(solution.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            onClick={() => handleSolutionClick(solution)}
                                            className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                                        >
                                            {/* Card Header */}
                                            <div className={`relative h-2 bg-gradient-to-r ${getColorClasses(solution.color)}`}>
                                                {solution.popular && (
                                                    <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        Popular
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6">
                                                {/* Icon and Title */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(solution.color)} text-white shadow-lg`}>
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                                                            {solution.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                            {solution.subtitle}
                                                        </p>
                                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                                            {solution.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {solution.description}
                                                </p>

                                                {/* Features */}
                                                <div className="space-y-2 mb-6">
                                                    {solution.features.slice(0, 3).map((feature, index) => (
                                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                    {solution.features.length > 3 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{solution.features.length - 3} more features
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CTA Button */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group-hover:translate-x-1 transition-transform">
                                                        {solution.link ? 'Learn More' : 'Get Started'}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getColorClasses(solution.color)}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No solutions found</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Try adjusting your search terms or browse different categories to find what you're looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 pt-8 border-t border-gray-200">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            We specialize in custom solutions tailored to your unique business needs.
                        </p>
                        <button 
                            onClick={() => navigate("/contact")}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            Get Custom Solution
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreAllSolutions;