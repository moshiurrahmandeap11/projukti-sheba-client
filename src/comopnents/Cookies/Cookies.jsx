import React from 'react';

const Cookies = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black mb-6 tracking-wide">Cookie Policy</h1>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
                </div>

                {/* Last Updated */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-900">Last Updated</p>
                            <p>October 2025</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-900">Website</p>
                            <p>https://projuktisheba.com</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-900">Brand Name</p>
                            <p>Projukti Sheba</p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-4 flex-shrink-0">1</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            This Cookie Policy explains how Projukti Sheba ("we", "our", "us") uses cookies and similar technologies on our website — https://projuktisheba.com.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-gray-700 font-medium">
                                By using our website, you agree to the use of cookies in accordance with this policy.
                            </p>
                        </div>
                    </section>

                    {/* What Are Cookies? */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-4 flex-shrink-0">2</div>
                            <h2 className="text-2xl font-semibold text-gray-900">What Are Cookies?</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Cookies are small text files that are stored on your device (computer, mobile, or tablet) when you visit a website.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            They help us recognize your device and improve your browsing experience.
                        </p>
                    </section>

                    {/* Types of Cookies We Use */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-4 flex-shrink-0">3</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Types of Cookies We Use</h2>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Essential Cookies */}
                            <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                                </div>
                                <p className="text-gray-700">
                                    These cookies are necessary for the basic functionality of the website — for example, allowing you to log in, fill out forms, or access secure areas.
                                </p>
                                <p className="text-gray-700 mt-2 font-medium">
                                    Without these cookies, some parts of the site may not work properly.
                                </p>
                            </div>

                            {/* Performance & Analytics Cookies */}
                            <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Performance & Analytics Cookies</h3>
                                </div>
                                <p className="text-gray-700">
                                    We use these cookies (like Google Analytics) to understand how visitors use our website, which pages are most popular, and how we can improve user experience.
                                </p>
                            </div>

                            {/* Functional Cookies */}
                            <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                                </div>
                                <p className="text-gray-700">
                                    These cookies allow the website to remember your preferences — such as language, region, or login information — so you don't have to re-enter them every time.
                                </p>
                            </div>

                            {/* Advertising or Marketing Cookies */}
                            <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Advertising or Marketing Cookies</h3>
                                </div>
                                <p className="text-gray-700">
                                    We may use cookies from trusted advertising partners (e.g., Facebook Pixel, Google Ads) to show relevant ads and measure campaign performance.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Cookies */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-bold mr-4 flex-shrink-0">4</div>
                            <h2 className="text-2xl font-semibold text-gray-900">How We Use Cookies</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {[
                                "Improve website speed and performance",
                                "Save your user preferences",
                                "Analyze website traffic and usage",
                                "Personalize content and ads"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Managing Cookies */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold mr-4 flex-shrink-0">5</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Managing Cookies</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            You can control or delete cookies through your browser settings anytime. Most browsers allow you to:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {[
                                "View what cookies are stored",
                                "Delete existing cookies",
                                "Block new cookies"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Browser Instructions:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { browser: "Chrome", path: "Settings → Privacy → Site Settings → Cookies" },
                                { browser: "Firefox", path: "Options → Privacy & Security → Cookies" },
                                { browser: "Edge", path: "Settings → Site Permissions → Cookies" },
                                { browser: "Safari", path: "Preferences → Privacy → Manage Website Data" }
                            ].map((item, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="font-semibold text-gray-900 mb-2">{item.browser}</p>
                                    <p className="text-sm text-gray-600">{item.path}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-gray-700 font-medium">
                                ⚠ Note: If you disable cookies, some features of our website may not work properly.
                            </p>
                        </div>
                    </section>

                    {/* Third-Party Cookies */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-sm font-bold mr-4 flex-shrink-0">6</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Third-Party Cookies</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Some cookies may come from third-party services that we use — such as:
                        </p>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {["Google Analytics", "Facebook Pixel"].map((service, index) => (
                                <span key={index} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                                    {service}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-700">
                            Each third party has its own privacy and cookie policies.
                        </p>
                    </section>

                    {/* Updates to This Policy */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold mr-4 flex-shrink-0">7</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Updates to This Policy</h2>
                        </div>
                        <p className="text-gray-700">
                            We may update this Cookie Policy from time to time to reflect changes in technology, law, or our business practices.
                            The "Last Updated" date above indicates the latest revision.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold mr-4 flex-shrink-0">8</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
                        </div>
                        <p className="text-gray-700 mb-6">If you have any questions about our Cookie Policy, please contact:</p>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                <span className="font-semibold w-24">Projukti Sheba</span>
                            </div>
                            <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                <span className="font-semibold w-24">🌐 Website</span>
                                <span>https://projuktisheba.com</span>
                            </div>
                            <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                <span className="font-semibold w-24">📧 Email</span>
                                <span>support@projuktisheba.com</span>
                            </div>
                            <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                <span className="font-semibold w-24">📞 Phone</span>
                                <span>+880 1712-377406</span>
                            </div>
                            <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                <span className="font-semibold w-24">🏢 Address</span>
                                <span>Netrokona, Mymensingh, Bangladesh</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Cookies;