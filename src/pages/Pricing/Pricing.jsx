import React, { useState, useEffect } from "react";
import {
  Check,
  ArrowRight,
  Code,
  Globe,
  Server,
  ShoppingCart,
  GraduationCap,
  Heart,
  Users,
  Play,
  Camera,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router";
import FancyButton from "../../comopnents/sharedItems/FancyButtons/FancyButton";

const Pricing = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Get icon based on category name
  const getIconForCategory = (categoryName) => {
    const nameLower = categoryName?.toLowerCase() || "";
    if (nameLower.includes("software")) return Code;
    if (nameLower.includes("website") || nameLower.includes("web"))
      return Globe;
    return Code; // Default icon
  };

  // Get icon based on product name or category
  const getIconForProduct = (productName) => {
    const nameLower = productName?.toLowerCase() || "";
    if (
      nameLower.includes("pos") ||
      nameLower.includes("shopping") ||
      nameLower.includes("e-commerce")
    )
      return ShoppingCart;
    if (nameLower.includes("school") || nameLower.includes("education"))
      return GraduationCap;
    if (
      nameLower.includes("hospital") ||
      nameLower.includes("health") ||
      nameLower.includes("medical")
    )
      return Heart;
    if (nameLower.includes("crm") || nameLower.includes("customer"))
      return Users;
    if (nameLower.includes("website") || nameLower.includes("web"))
      return Globe;
    if (nameLower.includes("software") || nameLower.includes("inventory"))
      return Server;
    if (nameLower.includes("wedding")) return Heart;
    if (nameLower.includes("youtube") || nameLower.includes("play"))
      return Play;
    return Server;
  };

  // Map categories for UI
  const uiCategories = categories.map((cat) => ({
    id: cat._id,
    name: cat.name,
    icon: getIconForCategory(cat.name),
  }));

  // Set dummy data
  useEffect(() => {
    const dummyCategories = [
      { _id: "1", name: "Software" },
      { _id: "2", name: "Website" },
    ];

    const dummyProducts = [
      {
        _id: "p1",
        name: "POS Software",
        description: "Point of Sale system for retail businesses",
        price: 99,
        startingPriceText: true,
        emi: "$20/month",
        popular: false,
        features: [
          "Inventory Management",
          "Sales Tracking",
          "Reporting",
          "User Management",
          "Multi-store Support",
        ],
        category: "Software",
      },
      {
        _id: "p2",
        name: "CRM Software",
        description: "Customer Relationship Management tool",
        price: 149,
        startingPriceText: true,
        emi: "$30/month",
        popular: true,
        features: [
          "Lead Tracking",
          "Contact Management",
          "Email Integration",
          "Analytics",
          "Automation",
        ],
        category: "Software",
      },
      {
        _id: "p5",
        name: "Inventory Software",
        description: "Advanced inventory management system",
        price: 129,
        startingPriceText: true,
        emi: "$25/month",
        popular: false,
        features: [
          "Stock Tracking",
          "Order Management",
          "Supplier Integration",
          "Barcode Support",
          "Reports",
        ],
        category: "Software",
      },
      {
        _id: "p6",
        name: "Inventory Software",
        description: "Advanced inventory management system",
        price: 129,
        startingPriceText: true,
        emi: "$25/month",
        popular: false,
        features: [
          "Stock Tracking",
          "Order Management",
          "Supplier Integration",
          "Barcode Support",
          "Reports",
        ],
        category: "Software",
      },
      {
        _id: "p3",
        name: "E-commerce Website",
        description: "Full-featured online store",
        price: 199,
        startingPriceText: true,
        emi: "$40/month",
        popular: true,
        features: [
          "Product Catalog",
          "Shopping Cart",
          "Payment Gateway",
          "SEO Optimization",
          "Mobile Responsive",
        ],
        category: "Website",
      },
      {
        _id: "p4",
        name: "Portfolio Website",
        description: "Professional showcase site",
        price: 99,
        startingPriceText: true,
        emi: "$20/month",
        popular: false,
        features: [
          "Custom Design",
          "Gallery",
          "Contact Form",
          "Blog Integration",
          "Social Links",
        ],
        category: "Website",
      },
      {
        _id: "p6",
        name: "Corporate Website",
        description: "Professional business site",
        price: 159,
        startingPriceText: true,
        emi: "$35/month",
        popular: false,
        features: [
          "About Pages",
          "Services Section",
          "Team Profiles",
          "Contact Integration",
          "SEO Ready",
        ],
        category: "Website",
      },
      {
        _id: "p7",
        name: "Corporate Website",
        description: "Professional business site",
        price: 159,
        startingPriceText: true,
        emi: "$35/month",
        popular: false,
        features: [
          "About Pages",
          "Services Section",
          "Team Profiles",
          "Contact Integration",
          "SEO Ready",
        ],
        category: "Website",
      },
      {
        _id: "p8",
        name: "Corporate Website",
        description: "Professional business site",
        price: 159,
        startingPriceText: true,
        emi: "$35/month",
        popular: false,
        features: [
          "About Pages",
          "Services Section",
          "Team Profiles",
          "Contact Integration",
          "SEO Ready",
        ],
        category: "Website",
      },
    ];

    setCategories(dummyCategories);
    setProducts(dummyProducts);

    if (dummyCategories.length > 0) setActiveCategory(dummyCategories[0]._id);
    setLoading(false);
  }, []);

  // Filter products for active category
  const currentPackages = products
    .filter((product) => {
      const activeCatName = categories.find(
        (cat) => cat._id === activeCategory
      )?.name;
      return product.category === activeCatName;
    })
    .map((product) => ({
      _id: product._id,
      name: product.name,
      description:
        product.description ||
        `Comprehensive ${product.name} solution for your business needs`,
      price: product.price || 50,
      period: product.startingPriceText ? "Starting From" : "Starting Price",
      monthlyCharge: product.emi || "$10/month",
      popular: product.popular || false,
      features: product.features || [],
      icon: getIconForProduct(product.name || product.category),
      category: product.category,
    }));

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Loading pricing information...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" relative pt-10 backdrop-blur-lg">
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
              Our <span>Pricing</span>
            </h1>
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uiCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 sm:px-6 cursor-pointer py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300  ${
                      activeCategory === cat.id
                        ? "bg-white text-red-600 font-medium shadow-lg transform scale-105"
                        : "bg-white text-black"
                    }`}
                  >
                    <div className="flex items-center space-x-2 justify-center">
                      <cat.icon className="w-5 h-5 text-red-600" />
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-red-700">
                        {cat.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {currentPackages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className={`relative group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                      pkg.popular ? "ring-1 ring-red-200" : ""
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="p-5 flex flex-col justify-between h-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900">
                          ${pkg.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          {pkg.period} • {pkg.monthlyCharge}
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6 text-sm text-gray-600 flex-1">
                        {pkg.features.length > 0 ? (
                          pkg.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 text-xs py-2">
                            Features coming soon
                          </div>
                        )}
                      </ul>
                      <div className="flex justify-start mt-auto">
                        <FancyButton onClick={() => navigate("/contact")}>
                          <div className="flex justify-center items-center gap-2 cursor-pointer">
                            <ArrowRight></ArrowRight>
                            <p>Order Now</p>
                          </div>
                        </FancyButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // No products available
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-500 mb-6">
                  Products for this category will be available soon.
                </p>
                <div
                  onClick={() => navigate("/contact")}
                  className="flex justify-center items-center"
                >
                  <button className="relative group bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-white text-sm sm:text-base font-medium">
                    Contact Us for Custom Solutions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
