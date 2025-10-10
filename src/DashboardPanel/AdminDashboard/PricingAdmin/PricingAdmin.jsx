import React, { useState, useEffect } from 'react';

import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Package,
  Tag,
  DollarSign,
  List,
  Check,
} from 'lucide-react';
import axiosInstance from '../../../hooks/AxiosInstance/AxiosInstance';

const PricingAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('categories');
  
  // Category states
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  // Product states
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    features: [''],
    description: '',
    popular: false,
    startingPriceText: false,
    emi: '$10/month'
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [categoriesRes, productsRes] = await Promise.all([
        axiosInstance.get('/pricing/categories'),
        axiosInstance.get('/pricing/products')
      ]);

      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data);
      }
      if (productsRes.data.success) {
        setProducts(productsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load data'
      });
    } finally {
      setLoading(false);
    }
  };

  // Category Functions
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingCategory) {
        await axiosInstance.put(`/pricing/categories/${editingCategory._id}`, {
          name: categoryForm.name
        });
        setMessage({ type: 'success', text: 'Category updated successfully!' });
      } else {
        await axiosInstance.post('/pricing/categories', {
          name: categoryForm.name
        });
        setMessage({ type: 'success', text: 'Category created successfully!' });
      }
      
      resetCategoryForm();
      fetchData();
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save category'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      setLoading(true);
      await axiosInstance.delete(`/pricing/categories/${categoryId}`);
      setMessage({ type: 'success', text: 'Category deleted successfully!' });
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to delete category'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  // Product Functions
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const productData = {
        ...productForm,
        price: Number(productForm.price),
        features: productForm.features.filter(feature => feature.trim() !== '')
      };

      if (editingProduct) {
        await axiosInstance.put(`/pricing/products/${editingProduct._id}`, productData);
        setMessage({ type: 'success', text: 'Product updated successfully!' });
      } else {
        await axiosInstance.post('/pricing/products', productData);
        setMessage({ type: 'success', text: 'Product created successfully!' });
      }
      
      resetProductForm();
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save product'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setLoading(true);
      await axiosInstance.delete(`/pricing/products/${productId}`);
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({
        type: 'error',
        text: 'Failed to delete product'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: '',
      price: '',
      features: [''],
      description: '',
      popular: false,
      startingPriceText: false,
      emi: '$10/month'
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const addFeatureField = () => {
    setProductForm({
      ...productForm,
      features: [...productForm.features, '']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm({ ...productForm, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index);
    setProductForm({ ...productForm, features: newFeatures });
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading && categories.length === 0 && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pricing Management</h1>
            <p className="text-gray-600">Manage categories and products for your pricing section</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'categories'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Categories ({categories.length})</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Products ({products.length})</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Category Form */}
              {showCategoryForm && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h3>
                    <button
                      onClick={resetCategoryForm}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., ERP Solutions"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingCategory ? 'Update' : 'Create'} Category</span>
                      </button>
                      <button
                        type="button"
                        onClick={resetCategoryForm}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Categories List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setCategoryForm({ name: category.name });
                            setShowCategoryForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Products: {products.filter(p => p.category === category.name).length}
                    </p>
                  </div>
                ))}
              </div>

              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Tag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No categories found. Create your first category!</p>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Product Form */}
              {showProductForm && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button
                      onClick={resetProductForm}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., ERP Software"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 250"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          EMI Text
                        </label>
                        <input
                          type="text"
                          value={productForm.emi}
                          onChange={(e) => setProductForm({ ...productForm, emi: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., $10/month"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                        placeholder="Product description..."
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Features
                        </label>
                        <button
                          type="button"
                          onClick={addFeatureField}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {productForm.features.map((feature, index) => (
                          <div key={index} className="flex space-x-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Feature description..."
                            />
                            {productForm.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="px-3 py-2 text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={productForm.popular}
                          onChange={(e) => setProductForm({ ...productForm, popular: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Mark as Popular</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={productForm.startingPriceText}
                          onChange={(e) => setProductForm({ ...productForm, startingPriceText: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Show 'Starting From'</span>
                      </label>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingProduct ? 'Update' : 'Create'} Product</span>
                      </button>
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {product.popular && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                category: product.category,
                                price: product.price.toString(),
                                features: product.features.length > 0 ? product.features : [''],
                                description: product.description || '',
                                popular: product.popular || false,
                                startingPriceText: product.startingPriceText || false,
                                emi: product.emi || '$10/month'
                              });
                              setShowProductForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-700">Price:</strong> ${product.price}
                      </div>
                      <div>
                        <strong className="text-gray-700">EMI:</strong> {product.emi}
                      </div>
                      <div>
                        <strong className="text-gray-700">Features:</strong> {product.features.length}
                      </div>
                    </div>
                    {product.description && (
                      <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No products found. Create your first product!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingAdmin;