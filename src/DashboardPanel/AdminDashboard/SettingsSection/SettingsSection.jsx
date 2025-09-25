import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Settings, Palette, Globe, Monitor } from 'lucide-react';
import LogoSettings from './LogoSettings/LogoSettings';


const SettingsSection = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSection = (sectionKey) => {
    setExpandedSection(prev => prev === sectionKey ? null : sectionKey);
    setSelectedItem(null); 
  };

  const settingsData = [
    {
      key: 'theme',
      title: 'Theme',
      icon: <Palette className="w-5 h-5" />,
      color: 'bg-purple-500',
      items: [
        { name: 'Logo', component: <LogoSettings /> },
        { name: 'Banner' },
        { name: 'Service Section' },
        { name: 'About Section' },
        { name: 'Contact Section' },
        { name: 'Pricing Section' },
        { name: 'Blogs Section' },
        { name: 'Glance Section' },
        { name: 'Solutions Section' },
        { name: 'Portfolio Section' },
        { name: 'Serve Section' },
        { name: 'Demand Section' },
        { name: 'Progress Section' },
        { name: 'Technologies' },
        { name: 'Testimonial' },
        { name: 'Tip Section' },
        { name: 'Footer Section' }
      ]
    },
    {
      key: 'site',
      title: 'Site Settings',
      icon: <Settings className="w-5 h-5" />,
      color: 'bg-blue-500',
      items: [
        { name: 'SEO Related Settings' },
        { name: 'Meta Tags' },
        { name: 'Page Titles' },
        { name: 'Meta Descriptions' },
        { name: 'Keywords' },
        { name: 'Open Graph Settings' },
        { name: 'Analytics Settings' },
        { name: 'Performance Settings' }
      ]
    },
    {
      key: 'web',
      title: 'Web Settings',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-green-500',
      items: [
        { name: 'Sitemap' },
        { name: 'Robot.txt' },
        { name: 'Favicon' },
        { name: 'Title' },
        { name: 'SSL Settings' },
        { name: 'Cache Settings' },
        { name: 'CDN Configuration' },
        { name: 'Security Headers' },
        { name: 'Error Pages' },
        { name: 'Redirects' }
      ]
    },
    {
      key: 'system',
      title: 'System Settings',
      icon: <Monitor className="w-5 h-5" />,
      color: 'bg-orange-500',
      items: [
        { name: 'Database Settings' },
        { name: 'Backup Configuration' },
        { name: 'User Management' },
        { name: 'Permissions' },
        { name: 'Email Configuration' },
        { name: 'API Settings' },
        { name: 'Maintenance Mode' },
        { name: 'Logging Settings' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Website Control Panel
          </h1>
          <p className="text-gray-600 text-lg">
            Manage all aspects of your website from this central dashboard
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid gap-6 md:gap-8">
          {settingsData.map((section) => (
            <div
              key={section.key}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              {/* Section Header */}
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSection(section.key)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`${section.color} p-3 rounded-lg text-white`}>
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      {section.items.length} options available
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 hidden sm:block">
                    {expandedSection === section.key ? 'Collapse' : 'Expand'}
                  </span>
                  {expandedSection === section.key ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expandable Content */}
              {expandedSection === section.key && (
                <div className="border-t border-gray-100">
                  <div className="p-6">
                    <div className="grid gap-3 sm:gap-4">
                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedItem(item)}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-200"></div>
                            <span className="text-gray-700 font-medium text-sm md:text-base">
                              {item.name}
                            </span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected Item Render */}
                    {selectedItem?.component && (
                      <div className="mt-6">
                        {selectedItem.component}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Click on any section above to access detailed configuration options
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 bg-gray-100 rounded-full">Responsive Design</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Easy Configuration</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
