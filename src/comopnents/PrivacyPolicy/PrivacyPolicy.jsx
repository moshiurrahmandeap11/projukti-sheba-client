import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 mt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black mb-6 tracking-wide">Privacy Policy</h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto"></div>
                </div>

                {/* Last Updated */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center border border-gray-200">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Last Updated:</span> October 2025
                    </p>
                    <p className="text-lg text-gray-700 mt-2">
                        <span className="font-semibold">Website:</span> https://projuktisheba.com
                    </p>
                    <p className="text-lg text-gray-700 mt-2">
                        <span className="font-semibold">Brand Name:</span> Projukti Sheba
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">1</span>
                            Introduction
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to Projukti Sheba — a leading technology solutions provider specializing in software, web development, and digital services.
                            Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">2</span>
                            Information We Collect
                        </h2>
                        <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Personal Information:</strong> Name, phone number, email address, business information, etc.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Technical Information:</strong> Browser type, device information, IP address, and website usage data.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Transactional Information:</strong> If you purchase a service or software, we may collect payment and billing details (handled securely).</span>
                            </li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">3</span>
                            How We Use Your Information
                        </h2>
                        <p className="text-gray-700 mb-4">We use your information to:</p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Provide and improve our services</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Communicate with you (offers, updates, and support)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Customize user experience</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Ensure website security and prevent misuse</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <strong>We do not sell, rent, or share your personal data with any third party for marketing purposes.</strong>
                        </p>
                    </section>

                    {/* Cookies Policy */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">4</span>
                            Cookies Policy 🍪
                        </h2>
                        <p className="text-gray-700 mb-4">Our website uses cookies to improve your browsing experience. Cookies help us:</p>
                        <ul className="space-y-3 text-gray-700 mb-4">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Remember your preferences</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Analyze traffic and performance</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            You can disable cookies anytime through your browser settings.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">5</span>
                            Data Security 🔒
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We use modern security technologies (SSL, encryption, secure servers) to protect your information.
                        </p>
                        <p className="text-gray-700 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            However, no online system is 100% secure — so we encourage users to take care while sharing personal data online.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">6</span>
                            Third-Party Services
                        </h2>
                        <p className="text-gray-700">
                            We may use trusted third-party tools like Google Analytics, Facebook Pixel, or payment gateways to enhance user experience.
                            These third parties may collect data as per their own privacy policies.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">7</span>
                            Your Rights
                        </h2>
                        <p className="text-gray-700 mb-4">You have the right to:</p>
                        <ul className="space-y-3 text-gray-700 mb-4">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Request a copy of your personal data</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Correct inaccurate information</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Request deletion of your data</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            To exercise these rights, contact us at 📧 <strong>support@projuktisheba.com</strong>
                        </p>
                    </section>

                    {/* Updates to This Policy */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">8</span>
                            Updates to This Policy
                        </h2>
                        <p className="text-gray-700">
                            We may update this Privacy Policy periodically. The "Last Updated" date will indicate the latest revision.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-3">9</span>
                            Contact Us 📞
                        </h2>
                        <p className="text-gray-700 mb-4">If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex items-center">
                                <span className="font-semibold w-24">Projukti Sheba</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-24">🌐 Website:</span>
                                <span>https://projuktisheba.com</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-24">📧 Email:</span>
                                <span>support@projuktisheba.com</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-24">📞 Phone:</span>
                                <span>+880 1712-377406</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-24">🏢 Address:</span>
                                <span>Netrokona, Mymensingh, Bangladesh</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;