import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
    BarChart3, BookOpen, Boxes, Building2, Bus, Car, 
    DollarSign, GraduationCap, Home, Hotel, LayoutGrid, 
    MessageCircle, MessageSquareText, MonitorSmartphone, 
    Newspaper, PenLine, Plane, Repeat, School, ShoppingCart, 
    Smartphone, UserCircle2, Users, Utensils, Search,
    Filter, ArrowRight, Star, CheckCircle2
} from 'lucide-react';

const ExploreAllSolutions = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);

    const categories = {
        'All': { icon: <LayoutGrid className="w-5 h-5" />, count: 24 },
        'ERP Solutions': { icon: <BarChart3 className="w-5 h-5" />, count: 3 },
        'E-commerce': { icon: <ShoppingCart className="w-5 h-5" />, count: 3 },
        'Restaurant': { icon: <Utensils className="w-5 h-5" />, count: 3 },
        'School': { icon: <School className="w-5 h-5" />, count: 3 },
        'Blog': { icon: <PenLine className="w-5 h-5" />, count: 3 },
        'Travel Agency': { icon: <Plane className="w-5 h-5" />, count: 3 },
        'Real Estate': { icon: <Home className="w-5 h-5" />, count: 3 },
        'Others': { icon: <Building2 className="w-5 h-5" />, count: 3 }
    };

    const allSolutions = [
        // ERP Solutions
        {
            id: 1,
            category: 'ERP Solutions',
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Business ERP',
            subtitle: 'Complete Enterprise Resource Planning solution for business management',
            description: 'Streamline your business operations with our comprehensive ERP system that integrates all core business functions.',
            features: ['Financial Management', 'Supply Chain', 'HR Management', 'Analytics'],
            popular: true,
            color: 'blue'
        },
        {
            id: 2,
            category: 'ERP Solutions',
            icon: <Users className="w-8 h-8" />,
            title: 'HR Management',
            subtitle: 'Human Resource Management System with payroll and attendance',
            description: 'Automate HR processes, manage payroll, track attendance, and enhance employee engagement.',
            features: ['Payroll System', 'Attendance Tracking', 'Employee Portal', 'Performance Management'],
            popular: false,
            color: 'green'
        },
        {
            id: 3,
            category: 'ERP Solutions',
            icon: <Boxes className="w-8 h-8" />,
            title: 'Inventory System',
            subtitle: 'Advanced inventory control and stock management system',
            description: 'Real-time inventory tracking, stock optimization, and automated reordering system.',
            features: ['Stock Tracking', 'Automated Reordering', 'Warehouse Management', 'Barcode Support'],
            popular: true,
            color: 'purple'
        },

        // E-commerce
        {
            id: 4,
            category: 'E-commerce',
            icon: <ShoppingCart className="w-8 h-8" />,
            title: 'Online Store',
            subtitle: 'Complete E-commerce platform with payment gateway integration',
            description: 'Launch your online store with multiple payment options and seamless customer experience.',
            features: ['Payment Gateway', 'Product Management', 'Order Tracking', 'Customer Portal'],
            popular: true,
            color: 'pink'
        },
        {
            id: 5,
            category: 'E-commerce',
            icon: <Smartphone className="w-8 h-8" />,
            title: 'Mobile Commerce',
            subtitle: 'Mobile-first shopping experience with app-like features',
            description: 'Progressive Web App with native app-like experience for mobile shoppers.',
            features: ['PWA Support', 'Push Notifications', 'Mobile Payments', 'Offline Browsing'],
            popular: false,
            color: 'indigo'
        },
        {
            id: 6,
            category: 'E-commerce',
            icon: <Repeat className="w-8 h-8" />,
            title: 'Multi-vendor',
            subtitle: 'Marketplace platform for multiple sellers and vendors',
            description: 'Create your own marketplace with vendor management and commission system.',
            features: ['Vendor Dashboard', 'Commission System', 'Multi-store', 'Vendor Analytics'],
            popular: true,
            color: 'orange'
        },

        // Restaurant
        {
            id: 7,
            category: 'Restaurant',
            icon: <Utensils className="w-8 h-8" />,
            title: 'Restaurant POS',
            subtitle: 'Point of Sale system with table management and billing',
            description: 'Complete restaurant management with table reservations, order tracking, and billing.',
            features: ['Table Management', 'Order Tracking', 'Billing System', 'Inventory Integration'],
            popular: true,
            color: 'rose'
        },
        {
            id: 8,
            category: 'Restaurant',
            icon: <MonitorSmartphone className="w-8 h-8" />,
            title: 'Online Ordering',
            subtitle: 'Food delivery and online ordering system for restaurants',
            description: 'Accept online orders with real-time delivery tracking and customer notifications.',
            features: ['Online Menu', 'Delivery Tracking', 'Customer App', 'Real-time Updates'],
            popular: false,
            color: 'blue'
        },
        {
            id: 9,
            category: 'Restaurant',
            icon: <LayoutGrid className="w-8 h-8" />,
            title: 'Kitchen Display',
            subtitle: 'Kitchen management system for order processing',
            description: 'Streamline kitchen operations with digital order display and preparation tracking.',
            features: ['Order Display', 'Preparation Time', 'Chef Notes', 'Order Priority'],
            popular: true,
            color: 'yellow'
        },

        // School
        {
            id: 10,
            category: 'School',
            icon: <School className="w-8 h-8" />,
            title: 'School Management',
            subtitle: 'Complete school administration and student management system',
            description: 'Comprehensive school management software for administration, academics, and operations.',
            features: ['Student Management', 'Academic Planning', 'Fee Management', 'Parent Portal'],
            popular: true,
            color: 'sky'
        },
        {
            id: 11,
            category: 'School',
            icon: <BookOpen className="w-8 h-8" />,
            title: 'Learning Management',
            subtitle: 'Online learning platform with course management',
            description: 'Digital learning platform with course creation, student tracking, and assessment tools.',
            features: ['Course Builder', 'Student Progress', 'Assessment Tools', 'Certificate Generation'],
            popular: false,
            color: 'violet'
        },
        {
            id: 12,
            category: 'School',
            icon: <GraduationCap className="w-8 h-8" />,
            title: 'Student Portal',
            subtitle: 'Student information system and academic portal',
            description: 'Student-centric portal for academic information, grades, and communication.',
            features: ['Grade Access', 'Course Materials', 'Communication Tools', 'Academic Calendar'],
            popular: true,
            color: 'emerald'
        },

        // Blog
        {
            id: 13,
            category: 'Blog',
            icon: <PenLine className="w-8 h-8" />,
            title: 'Blog Platform',
            subtitle: 'Content management system for bloggers and writers',
            description: 'Modern blogging platform with advanced content management and SEO tools.',
            features: ['Content Editor', 'SEO Optimization', 'Social Sharing', 'Analytics'],
            popular: false,
            color: 'indigo'
        },
        {
            id: 14,
            category: 'Blog',
            icon: <Newspaper className="w-8 h-8" />,
            title: 'News Portal',
            subtitle: 'News website with article management and publishing',
            description: 'Professional news portal with multi-author support and real-time publishing.',
            features: ['Multi-author', 'Real-time Publishing', 'Comment System', 'Newsletter'],
            popular: true,
            color: 'blue'
        },
        {
            id: 15,
            category: 'Blog',
            icon: <MessageSquareText className="w-8 h-8" />,
            title: 'Content Management',
            subtitle: 'Advanced CMS for media and content publishing',
            description: 'Enterprise-grade content management system for media companies and publishers.',
            features: ['Media Library', 'Workflow Management', 'Multi-language', 'Content Scheduling'],
            popular: true,
            color: 'gray'
        },

        // Travel Agency
        {
            id: 16,
            category: 'Travel Agency',
            icon: <Plane className="w-8 h-8" />,
            title: 'Flight Booking',
            subtitle: 'Flight reservation and booking management system',
            description: 'Comprehensive flight booking system with real-time availability and pricing.',
            features: ['Real-time Booking', 'Payment Processing', 'Itinerary Management', 'Customer Portal'],
            popular: true,
            color: 'sky'
        },
        {
            id: 17,
            category: 'Travel Agency',
            icon: <Hotel className="w-8 h-8" />,
            title: 'Hotel Booking',
            subtitle: 'Hotel reservation and accommodation booking platform',
            description: 'Hotel booking platform with room availability, pricing, and reservation management.',
            features: ['Room Management', 'Booking Engine', 'Payment Gateway', 'Customer Reviews'],
            popular: false,
            color: 'orange'
        },
        {
            id: 18,
            category: 'Travel Agency',
            icon: <Bus className="w-8 h-8" />,
            title: 'Tour Package',
            subtitle: 'Tour package management and booking system',
            description: 'Create and manage tour packages with itinerary planning and booking capabilities.',
            features: ['Package Builder', 'Itinerary Planning', 'Booking System', 'Guide Management'],
            popular: true,
            color: 'green'
        },

        // Real Estate
        {
            id: 19,
            category: 'Real Estate',
            icon: <Home className="w-8 h-8" />,
            title: 'Property Listing',
            subtitle: 'Real estate property listing and management system',
            description: 'Comprehensive property listing platform with advanced search and filtering.',
            features: ['Property Management', 'Advanced Search', 'Virtual Tours', 'Lead Management'],
            popular: true,
            color: 'rose'
        },
        {
            id: 20,
            category: 'Real Estate',
            icon: <UserCircle2 className="w-8 h-8" />,
            title: 'Agent Portal',
            subtitle: 'Real estate agent management and client portal',
            description: 'Agent management system with client relationship management and lead tracking.',
            features: ['Agent Dashboard', 'CRM Integration', 'Lead Tracking', 'Commission Management'],
            popular: false,
            color: 'teal'
        },
        {
            id: 21,
            category: 'Real Estate',
            icon: <DollarSign className="w-8 h-8" />,
            title: 'Property Management',
            subtitle: 'Rental and property management system for landlords',
            description: 'Property management software for rental properties, maintenance, and tenant management.',
            features: ['Rent Collection', 'Maintenance Tracking', 'Tenant Portal', 'Financial Reporting'],
            popular: true,
            color: 'green'
        },

        // Others
        {
            id: 22,
            category: 'Others',
            icon: <Car className="w-8 h-8" />,
            title: 'Vehicle Management',
            subtitle: 'Fleet and vehicle management system for transportation',
            description: 'Fleet management system with vehicle tracking, maintenance, and driver management.',
            features: ['Vehicle Tracking', 'Maintenance Scheduling', 'Driver Management', 'Fuel Monitoring'],
            popular: false,
            color: 'blue'
        },
        {
            id: 23,
            category: 'Others',
            icon: <Building2 className="w-8 h-8" />,
            title: 'Garage System',
            subtitle: 'Garage and workshop management software',
            description: 'Automotive workshop management with job tracking, inventory, and customer management.',
            features: ['Job Management', 'Parts Inventory', 'Customer History', 'Billing System'],
            popular: true,
            color: 'indigo'
        },
        {
            id: 24,
            category: 'Others',
            icon: <MessageCircle className="w-8 h-8" />,
            title: 'Live Chat',
            subtitle: 'Business live chat and customer support software',
            description: 'Real-time customer support with live chat, ticket management, and analytics.',
            features: ['Live Chat', 'Ticket System', 'Chat Bot', 'Analytics Dashboard'],
            popular: true,
            color: 'purple'
        }
    ];

    const filteredSolutions = allSolutions.filter(solution => {
        const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            solution.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            solution.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || solution.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getColorClasses = (color) => {
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
        return colorMap[color] || 'from-gray-500 to-gray-600';
    };

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
                                {filteredSolutions.map((solution) => (
                                    <div
                                        key={solution.id}
                                        onMouseEnter={() => setHoveredCard(solution.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
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
                                                    {solution.icon}
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
                                            <div onClick={() => navigate("/contact") } className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group-hover:translate-x-1 transition-transform">
                                                    Learn More
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getColorClasses(solution.color)}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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