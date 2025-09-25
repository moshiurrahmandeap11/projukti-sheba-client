import React, { useState, useEffect } from "react";
import {
  Check,
  Star,
  ArrowRight,
  Code,
  Globe,
  Video,
  TrendingUp,
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
import axios from "axios";

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
    if (nameLower.includes("video")) return Video;
    if (nameLower.includes("ads") || nameLower.includes("social"))
      return TrendingUp;
    return Code; // Default icon
  };

  // Get color scheme based on category
  const getColorForCategory = (categoryName) => {
    const nameLower = categoryName?.toLowerCase() || "";
    if (nameLower.includes("software")) return "from-blue-500 to-cyan-500";
    if (nameLower.includes("website") || nameLower.includes("web"))
      return "from-purple-500 to-pink-500";
    if (nameLower.includes("video")) return "from-green-500 to-emerald-500";
    if (nameLower.includes("ads") || nameLower.includes("social"))
      return "from-orange-500 to-red-500";
    return "from-blue-500 to-cyan-500";
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
    if (nameLower.includes("video")) return Video;
    if (
      nameLower.includes("ads") ||
      nameLower.includes("facebook") ||
      nameLower.includes("instagram")
    )
      return TrendingUp;
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
    color: getColorForCategory(cat.name),
  }));

  // Fetch all categories and products once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("https://projukti-sheba-server.onrender.com/categories"),
          axios.get("https://projukti-sheba-server.onrender.com/products"),
        ]);

        const categoriesData = categoriesRes.data.data || [];
        const productsData = productsRes.data.data || [];

        setCategories(categoriesData);
        setProducts(productsData);

        if (categoriesData.length > 0) setActiveCategory(categoriesData[0]._id);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <FancyButton onClick={() => window.location.reload()}>
            <span className="relative z-10 flex items-center space-x-2">
              <span>Retry</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </FancyButton>
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
            <div className="inline-block p-4 rounded-full bg-red-400/70 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] mb-6">
              <Star className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
              Our <span>Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of digital solutions. From
              custom software to creative services, we have the perfect package
              for your business needs.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {uiCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group relative p-6 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                      activeCategory === cat.id
                        ? "border-red-400 shadow-[0_4px_30px_rgba(0,0,0,0.2)] scale-105"
                        : "border-[rgba(255,255,255,0.1)] hover:scale-105"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-400/70 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-red-700">
                      {cat.name}
                    </h3>
                    <div
                      className={`h-1 w-full rounded-full transition-all duration-300 ${
                        activeCategory === cat.id
                          ? "bg-red-400"
                          : "bg-[rgba(255,255,255,0.2)] group-hover:bg-[rgba(0,120,160,0.5)]"
                      }`}
                    ></div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className={`relative group bg-red-50 backdrop-blur-md border rounded-2xl p-8  transition-all duration-500 hover:scale-105 hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] ${
                      pkg.popular
                        ? "border-[rgba(0,120,160,0.5)] shadow-[0_4px_30px_rgba(0,120,160,0.2)] scale-105"
                        : "border-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[rgba(0,120,160,0.5)] text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm border border-[rgba(255,255,255,0.1)]">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-400/70 mb-4 group-hover:scale-110 transition-transform duration-300">
                          <pkg.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-red-700">
                          {pkg.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>
                      <div className="text-center mb-8">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-black">
                            ${pkg.price}
                          </span>
                        </div>
                        <div className="text-gray-600 mt-2">
                          <div>{pkg.period}</div>
                          <div className="text-sm">{pkg.monthlyCharge}</div>
                        </div>
                      </div>
                      <div className="space-y-4 mb-8">
                        {pkg.features.length > 0 ? (
                          pkg.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3"
                            >
                              <Check className="w-5 h-5 text-[rgba(0,120,160,0.8)] flex-shrink-0" />
                              <span className="text-gray-600 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 text-sm py-4">
                            Features will be updated soon
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        {/* Global Fixed CTA */}
                        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                          <button
                            onClick={() => navigate("/contact")}
                            className="relative group bg-red-700 px-6 py-3 rounded-full cursor-pointer text-white text-base font-medium shadow-lg overflow-hidden"
                          >
                            <span className="relative z-10">Get Started</span>
                          
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                  <button className="relative group bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-white text-sm sm:text-base font-medium overflow-hidden">
                    <span className="relative z-10">
                      Contact Us for Custom Solutions
                    </span>
                    
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#EDFDFF] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-2xl p-12 relative shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-black mb-4">
                  Need a Custom Solution?
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Can't find what you're looking for? Let's discuss your unique
                  requirements and create a tailored solution that fits your
                  business perfectly.
                </p>
                <div
                  onClick={() => navigate("/contact")}
                  className="flex justify-center"
                >
                  <button className="relative group bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer text-white text-sm sm:text-base font-medium overflow-hidden">
                    <span className="relative z-10">Contact Us</span>
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
