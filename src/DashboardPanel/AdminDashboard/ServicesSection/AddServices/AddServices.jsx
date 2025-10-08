import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Select from "react-select";
import toast from "react-hot-toast";
import { PlusCircle, ArrowLeft, X, Trash2, Loader2, MoreVertical } from "lucide-react";

const AddServices = () => {
  const [formData, setFormData] = useState({
    title: "",
    paragraph: "",
    keyFeatures: "",
    technologies: [],
    category: "", // Added category field
    totalProjects: "",
  });
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [message, setMessage] = useState("");
  const [isAddTechModalOpen, setIsAddTechModalOpen] = useState(false);
  const [isManageTechModalOpen, setIsManageTechModalOpen] = useState(false);
  const [newTechName, setNewTechName] = useState("");
  const [techLoading, setTechLoading] = useState(false);
  const [manageTechLoading, setManageTechLoading] = useState(false);
  const [deleteTechLoading, setDeleteTechLoading] = useState(false);
  const [technologiesList, setTechnologiesList] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isManageCategoryModalOpen, setIsManageCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [manageCategoryLoading, setManageCategoryLoading] = useState(false);
  const [deleteCategoryLoading, setDeleteCategoryLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const addTechInputRef = useRef(null);
  const addCategoryInputRef = useRef(null);
  const manageTechModalRef = useRef(null);
  const manageCategoryModalRef = useRef(null);
  const menuRef = useRef(null);

  // Fetch technologies from backend
  const fetchTechnologies = useCallback(async () => {
    try {
      setTechLoading(true);
      const res = await axios.get("https://projukti-sheba-server.onrender.com/technologies");
      const techData = Array.isArray(res.data.data) ? res.data.data : [];
      if (!techData.length) toast.warn("No technologies found");
      setAllTechnologies(techData);
    } catch (error) {
      console.error("❌ Failed to fetch technologies:", error);
      toast.error(`Failed to load technologies: ${error.message}`);
      setAllTechnologies([]);
    } finally {
      setTechLoading(false);
    }
  }, []);

  // Fetch categories from backend
  const fetchCategories = useCallback(async () => {
    try {
      setCategoryLoading(true);
      const res = await axios.get("https://projukti-sheba-server.onrender.com/categories");
      const categoryData = Array.isArray(res.data.data) ? res.data.data : [];
      setCategoriesList(categoryData);
    } catch (error) {
      console.error("❌ Failed to fetch categories:", error);
      toast.error(`Failed to load categories: ${error.message}`);
      setCategoriesList([]);
    } finally {
      setCategoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
    fetchCategories();
  }, [fetchTechnologies, fetchCategories]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle react-select changes for technologies
  const handleTechChange = (selectedOptions) => {
    setFormData({
      ...formData,
      technologies: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    });
  };

  // Handle react-select changes for category
  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.paragraph.trim() || !formData.category) {
      toast.error("Title, description, and category are required");
      return;
    }
    try {
      const payload = {
        ...formData,
        keyFeatures: formData.keyFeatures
          ? formData.keyFeatures.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
        totalProjects: Number(formData.totalProjects) || 0,
      };
      const res = await axios.post("https://projukti-sheba-server.onrender.com/services", payload);
      if (res.data.success) {
        setMessage("✅ Service added successfully!");
        setFormData({
          title: "",
          paragraph: "",
          keyFeatures: "",
          technologies: [],
          category: "",
          totalProjects: "",
        });
        toast.success("Service added successfully!");
        setTimeout(() => navigate("/services"), 2000);
      }
    } catch (error) {
      setMessage("❌ Failed to add service!");
      toast.error(`Failed to add service: ${error.message}`);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Toggle 3-dot menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open Add Technology Modal
  const openAddTechModal = () => {
    setIsAddTechModalOpen(true);
    setNewTechName("");
    setIsMenuOpen(false);
    setTimeout(() => addTechInputRef.current?.focus(), 100);
  };

  // Close Add Technology Modal
  const closeAddTechModal = () => {
    setIsAddTechModalOpen(false);
  };

  // Handle Add Technology Submit
  const handleAddTechSubmit = async (e) => {
    e.preventDefault();
    if (!newTechName.trim()) {
      toast.error("Technology name is required");
      return;
    }
    try {
      await axios.post("https://projukti-sheba-server.onrender.com/technologies", [{ name: newTechName }]);
      toast.success("Technology added successfully!");
      closeAddTechModal();
      fetchTechnologies();
    } catch (error) {
      toast.error(`Failed to add technology: ${error.message}`);
    }
  };

  // Open Manage Technology Modal
  const openManageTechModal = async () => {
    setManageTechLoading(true);
    setIsMenuOpen(false);
    try {
      const res = await axios.get("https://projukti-sheba-server.onrender.com/technologies");
      const techData = Array.isArray(res.data.data) ? res.data.data : [];
      if (!techData.length) toast.warn("No technologies available to manage");
      setTechnologiesList(techData);
      setIsManageTechModalOpen(true);
    } catch (error) {
      console.error("❌ Failed to load technologies for management:", error);
      toast.error(`Failed to load technologies: ${error.message}`);
      setTechnologiesList([]);
    } finally {
      setManageTechLoading(false);
    }
  };

  // Close Manage Technology Modal
  const closeManageTechModal = () => {
    setIsManageTechModalOpen(false);
  };

  // Handle Delete Technology
  const handleDeleteTech = async (techId) => {
    if (!window.confirm(`Are you sure you want to delete this technology?`)) return;
    try {
      setDeleteTechLoading(true);
      await axios.delete(`https://projukti-sheba-server.onrender.com/technologies/${techId}`);
      toast.success("Technology deleted successfully!");
      setTechnologiesList((prev) => prev.filter((tech) => tech._id !== techId));
      fetchTechnologies();
    } catch (error) {
      console.error("❌ Failed to delete technology:", error);
      toast.error(`Failed to delete technology: ${error.message}`);
    } finally {
      setDeleteTechLoading(false);
    }
  };

  // Open Add Category Modal
  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
    setNewCategoryName("");
    setIsMenuOpen(false);
    setTimeout(() => addCategoryInputRef.current?.focus(), 100);
  };

  // Close Add Category Modal
  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  // Handle Add Category Submit
  const handleAddCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const res = await axios.post("https://projukti-sheba-server.onrender.com/categories", [{ name: newCategoryName }]);
      if (res.data.success) {
        toast.success("Category added successfully!");
        closeAddCategoryModal();
        fetchCategories();
      } else {
        throw new Error(res.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("❌ Failed to add category:", error);
      toast.error(`Failed to add category: ${error.message}`);
    }
  };

  // Open Manage Category Modal
  const openManageCategoryModal = async () => {
    setManageCategoryLoading(true);
    setIsMenuOpen(false);
    try {
      const res = await axios.get("https://projukti-sheba-server.onrender.com/categories");
      const categoryData = Array.isArray(res.data.data) ? res.data.data : [];
      if (!categoryData.length) toast.warn("No categories available to manage");
      setCategoriesList(categoryData);
      setIsManageCategoryModalOpen(true);
    } catch (error) {
      console.error("❌ Failed to load categories for management:", error);
      toast.error(`Failed to load categories: ${error.message}`);
      setCategoriesList([]);
    } finally {
      setManageCategoryLoading(false);
    }
  };

  // Close Manage Category Modal
  const closeManageCategoryModal = () => {
    setIsManageCategoryModalOpen(false);
  };

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm(`Are you sure you want to delete this category?`)) return;
    try {
      setDeleteCategoryLoading(true);
      const res = await axios.delete(`https://projukti-sheba-server.onrender.com/categories/${categoryId}`);
      if (res.data.success) {
        toast.success("Category deleted successfully!");
        setCategoriesList((prev) => prev.filter((category) => category._id !== categoryId));
        fetchCategories();
      } else {
        throw new Error(res.data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("❌ Failed to delete category:", error);
      toast.error(`Failed to delete category: ${error.message}`);
    } finally {
      setDeleteCategoryLoading(false);
    }
  };

  // Handle ESC key for modals and menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (isAddTechModalOpen) closeAddTechModal();
        if (isManageTechModalOpen) closeManageTechModal();
        if (isAddCategoryModalOpen) closeAddCategoryModal();
        if (isManageCategoryModalOpen) closeManageCategoryModal();
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isAddTechModalOpen, isManageTechModalOpen, isAddCategoryModalOpen, isManageCategoryModalOpen, isMenuOpen]);

  // Custom styles for react-select
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(17, 24, 39, 0.5))",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.75rem",
      padding: "0.5rem",
      color: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "rgba(139, 92, 246, 0.3)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(17, 24, 39, 0.9))",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.75rem",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "rgba(139, 92, 246, 0.3)" : "transparent",
      color: "#fff",
      "&:hover": {
        background: "rgba(139, 92, 246, 0.2)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValue: (provided) => ({
      ...provided,
      background: "rgba(139, 92, 246, 0.4)",
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      "&:hover": {
        background: "rgba(239, 68, 68, 0.5)",
        color: "#fff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(209, 213, 219, 0.7)",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900/80 via-slate-900/70 to-gray-900/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800/50 via-slate-800/40 to-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h2 className="text-3xl font-bold text-white text-center tracking-tight flex-grow">
            <PlusCircle className="inline-block mr-2" size={24} /> Add New Service
          </h2>
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
              aria-label="More options"
              aria-expanded={isMenuOpen}
              aria-controls="menu-options"
            >
              <MoreVertical size={18} />
            </button>
            {isMenuOpen && (
              <ul
                id="menu-options"
                className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-800/70 via-slate-800/60 to-gray-800/70 backdrop-blur-lg rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right scale-95 opacity-0 animate-[dropdown_0.2s_ease-in-out_forwards]"
              >
                <li>
                  <button
                    onClick={openAddTechModal}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-500/20 transition-colors"
                    aria-label="Add Technology"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Add Technology
                  </button>
                </li>
                <li>
                  <button
                    onClick={openManageTechModal}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-500/20 transition-colors"
                    aria-label="Manage Technologies"
                  >
                    Manage Technologies
                  </button>
                </li>
                <li>
                  <button
                    onClick={openAddCategoryModal}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-500/20 transition-colors"
                    aria-label="Add Category"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Add Category
                  </button>
                </li>
                <li>
                  <button
                    onClick={openManageCategoryModal}
                    className="flex items-center w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-500/20 transition-colors"
                    aria-label="Manage Categories"
                  >
                    Manage Categories
                  </button>
                </li>
              </ul>
            )}
            <style jsx>{`
              @keyframes dropdown {
                from {
                  opacity: 0;
                  transform: scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}</style>
          </div>
        </div>
        {message && (
          <p className="text-center mb-6 text-lg text-purple-400 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Service Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter service title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            {categoryLoading ? (
              <div className="flex justify-center items-center h-12">
                <Loader2 className="animate-spin text-purple-500" size={24} />
              </div>
            ) : (
              <Select
                id="category"
                name="category"
                options={categoriesList.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                }))}
                value={categoriesList
                  .map((cat) => ({ value: cat.name, label: cat.name }))
                  .find((cat) => cat.value === formData.category) || null}
                onChange={handleCategoryChange}
                styles={selectStyles}
                placeholder="Select a category..."
                className="text-white"
                aria-label="Select category"
                isClearable
                required
                aria-required="true"
              />
            )}
          </div>

          <div>
            <label htmlFor="paragraph" className="block text-sm font-medium text-gray-300 mb-1">
              Service Description
            </label>
            <textarea
              id="paragraph"
              name="paragraph"
              placeholder="Enter service description"
              value={formData.paragraph}
              onChange={handleChange}
              className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 min-h-[120px] md:min-h-[150px]"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="keyFeatures" className="block text-sm font-medium text-gray-300 mb-1">
              Key Features (comma-separated)
            </label>
            <input
              id="keyFeatures"
              type="text"
              name="keyFeatures"
              placeholder="e.g., Feature 1, Feature 2, Feature 3"
              value={formData.keyFeatures}
              onChange={handleChange}
              className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
              aria-describedby="keyFeatures-help"
            />
            <p id="keyFeatures-help" className="text-xs text-gray-500 mt-1">
              Separate features with commas
            </p>
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-1">
              Technologies
            </label>
            {techLoading ? (
              <div className="flex justify-center items-center h-12">
                <Loader2 className="animate-spin text-purple-500" size={24} />
              </div>
            ) : (
              <Select
                id="technologies"
                isMulti
                name="technologies"
                options={allTechnologies.map((tech) => ({
                  value: tech.name,
                  label: tech.name,
                }))}
                value={allTechnologies
                  .map((tech) => ({ value: tech.name, label: tech.name }))
                  .filter((tech) => formData.technologies.includes(tech.value))}
                onChange={handleTechChange}
                styles={selectStyles}
                placeholder="Select technologies..."
                className="text-white"
                aria-label="Select technologies"
              />
            )}
          </div>

          <div>
            <label htmlFor="totalProjects" className="block text-sm font-medium text-gray-300 mb-1">
              Total Projects
            </label>
            <input
              id="totalProjects"
              type="number"
              name="totalProjects"
              placeholder="Enter total projects"
              value={formData.totalProjects}
              onChange={handleChange}
              className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
              min="0"
              aria-describedby="totalProjects-help"
            />
            <p id="totalProjects-help" className="text-xs text-gray-500 mt-1">
              Enter a number (optional)
            </p>
          </div>
          

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
            aria-label="Add Service"
          >
            <PlusCircle size={18} />
            <span>Add Service</span>
          </button>
        </form>
      </div>

      {/* Add Technology Modal */}
      {isAddTechModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-tech-title"
        >
          <div className="bg-gradient-to-br from-gray-800/70 via-slate-800/60 to-gray-800/70 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-md mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 id="add-tech-title" className="text-xl font-bold text-white">
                Add New Technology
              </h3>
              <button
                onClick={closeAddTechModal}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTechSubmit} className="space-y-4">
              <input
                ref={addTechInputRef}
                type="text"
                placeholder="Enter technology name"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
                required
                aria-required="true"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
                aria-label="Submit new technology"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Manage Technology Modal */}
      {isManageTechModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="manage-tech-title"
          ref={manageTechModalRef}
        >
          <div className="bg-gradient-to-br from-gray-800/70 via-slate-800/60 to-gray-800/70 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-lg mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 id="manage-tech-title" className="text-xl font-bold text-white">
                Manage Technologies
              </h3>
              <button
                onClick={closeManageTechModal}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            {manageTechLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="animate-spin text-purple-500" size={32} />
              </div>
            ) : technologiesList.length === 0 ? (
              <p className="text-center text-gray-400">No technologies available.</p>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {technologiesList.map((tech) => (
                  <li
                    key={tech._id}
                    className="flex justify-between items-center bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-lg p-3 text-white"
                  >
                    <span>{tech.name}</span>
                    <button
                      onClick={() => handleDeleteTech(tech._id)}
                      disabled={deleteTechLoading}
                      className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                      aria-label={`Delete ${tech.name}`}
                    >
                      {deleteTechLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-category-title"
        >
          <div className="bg-gradient-to-br from-gray-800/70 via-slate-800/60 to-gray-800/70 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-md mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 id="add-category-title" className="text-xl font-bold text-white">
                Add New Category
              </h3>
              <button
                onClick={closeAddCategoryModal}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <input
                ref={addCategoryInputRef}
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full p-3 bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all duration-300"
                required
                aria-required="true"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/40 hover:scale-105 border border-purple-500/30 backdrop-blur-sm"
                aria-label="Submit new category"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Manage Category Modal */}
      {isManageCategoryModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="manage-category-title"
          ref={manageCategoryModalRef}
        >
          <div className="bg-gradient-to-br from-gray-800/70 via-slate-800/60 to-gray-800/70 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl p-6 w-full max-w-lg mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 id="manage-category-title" className="text-xl font-bold text-white">
                Manage Categories
              </h3>
              <button
                onClick={closeManageCategoryModal}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            {manageCategoryLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="animate-spin text-purple-500" size={32} />
              </div>
            ) : categoriesList.length === 0 ? (
              <p className="text-center text-gray-400">No categories available.</p>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {categoriesList.map((category) => (
                  <li
                    key={category._id}
                    className="flex justify-between items-center bg-gradient-to-br from-gray-800/30 via-slate-800/20 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-lg p-3 text-white"
                  >
                    <span>{category.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      disabled={deleteCategoryLoading}
                      className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                      aria-label={`Delete ${category.name}`}
                    >
                      {deleteCategoryLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AddServices;