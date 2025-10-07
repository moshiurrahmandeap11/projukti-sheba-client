import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-black mb-6 tracking-wide">Terms of Service</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Last Updated */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2">
                            <p className="font-semibold text-gray-900 text-lg">Last Updated</p>
                            <p className="text-gray-700">October 2025</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold text-gray-900 text-lg">Website</p>
                            <p className="text-gray-700">https://projuktisheba.com</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold text-gray-900 text-lg">Brand Name</p>
                            <p className="text-gray-700">Projukti Sheba</p>
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
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to Projukti Sheba — a leading technology solutions provider specializing in software, web development, and digital marketing services.
                        </p>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-gray-700 font-medium">
                                By accessing or using our website (projuktisheba.com), you agree to be bound by these Terms of Service.
                                If you do not agree, please do not use our website or services.
                            </p>
                        </div>
                    </section>

                    {/* Definitions */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-4 flex-shrink-0">2</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Definitions</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="font-semibold text-gray-900 mb-2">"We", "Our", "Us"</p>
                                    <p className="text-gray-700">means Projukti Sheba.</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="font-semibold text-gray-900 mb-2">"Services"</p>
                                    <p className="text-gray-700">means all digital, software, and web-related solutions offered by Projukti Sheba.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="font-semibold text-gray-900 mb-2">"You", "User", "Client"</p>
                                    <p className="text-gray-700">means anyone visiting or using our website or services.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Use of Our Website */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-4 flex-shrink-0">3</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Use of Our Website</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            You agree to use this website only for lawful purposes. You must not:
                        </p>
                        <div className="space-y-3">
                            {[
                                "Engage in any activity that disrupts or damages our systems or services.",
                                "Copy, reproduce, or redistribute website content without written permission.",
                                "Attempt to hack, reverse engineer, or misuse our software or systems."
                            ].map((item, index) => (
                                <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Intellectual Property Rights */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mr-4 flex-shrink-0">4</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Intellectual Property Rights</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            All content on projuktisheba.com — including text, graphics, logos, images, and software — is owned by Projukti Sheba or its licensors.
                        </p>
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-gray-700 font-medium">
                                Unauthorized use, copying, or reproduction of this content is strictly prohibited.
                            </p>
                        </div>
                    </section>

                    {/* Service Terms */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-bold mr-4 flex-shrink-0">5</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Service Terms</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-gray-700">
                                    All services provided by Projukti Sheba are subject to specific agreements and pricing.
                                </p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-gray-700 font-medium">
                                    Once payment is made for a service or product, it is considered non-refundable, unless otherwise stated in a written agreement.
                                </p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-gray-700">
                                    We reserve the right to modify, suspend, or discontinue any service with prior notice.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* User Accounts */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-bold mr-4 flex-shrink-0">6</div>
                            <h2 className="text-2xl font-semibold text-gray-900">User Accounts</h2>
                        </div>
                        <p className="text-gray-700 mb-4">If you create an account on our website:</p>
                        <div className="space-y-3">
                            {[
                                "You are responsible for maintaining the confidentiality of your login details.",
                                "You agree to provide accurate and up-to-date information.",
                                "Projukti Sheba reserves the right to suspend or terminate accounts for misuse."
                            ].map((item, index) => (
                                <div key={index} className="flex items-start p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Payment and Billing */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold mr-4 flex-shrink-0">7</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Payment and Billing</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                                    <p className="font-semibold text-gray-900 mb-2">Currency</p>
                                    <p className="text-gray-700">All prices are listed in Bangladeshi Taka (BDT) unless otherwise stated.</p>
                                </div>
                                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                                    <p className="font-semibold text-gray-900 mb-2">Taxes</p>
                                    <p className="text-gray-700">Any applicable tax or VAT will be added as per Bangladesh law.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                                    <p className="font-semibold text-gray-900 mb-2">Payment Methods</p>
                                    <p className="text-gray-700">Payment can be made through approved gateways or bank transfers.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold mr-4 flex-shrink-0">8</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Projukti Sheba will not be liable for any indirect, incidental, or consequential damages arising from:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {[
                                "Service interruptions",
                                "Data loss", 
                                "Technical errors",
                                "Unauthorized access"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-gray-700 font-medium">
                                Our total liability will not exceed the amount paid by you for the specific service.
                            </p>
                        </div>
                    </section>

                    {/* Third-Party Links */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-sm font-bold mr-4 flex-shrink-0">9</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Third-Party Links</h2>
                        </div>
                        <p className="text-gray-700">
                            Our website may contain links to external websites or services. We are not responsible for the content, privacy, or practices of third-party sites.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm font-bold mr-4 flex-shrink-0">10</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Termination</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            We may suspend or terminate access to our website or services at any time if:
                        </p>
                        <div className="space-y-3">
                            {[
                                "You violate these Terms",
                                "You misuse our systems or engage in fraudulent activities"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Changes to Terms */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mr-4 flex-shrink-0">11</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Changes to Terms</h2>
                        </div>
                        <p className="text-gray-700">
                            We may update these Terms of Service at any time. All changes will be posted on this page with an updated "Last Updated" date.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mr-4 flex-shrink-0">12</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Governing Law</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            These Terms are governed by and construed under the laws of Bangladesh.
                        </p>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-gray-700 font-medium">
                                Any disputes will be subject to the jurisdiction of courts in Netrokona, Bangladesh.
                            </p>
                        </div>
                    </section>

                    {/* Contact Us */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-start mb-6">
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-sm font-bold mr-4 flex-shrink-0">13</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Contact Us 📞</h2>
                        </div>
                        <p className="text-gray-700 mb-6">If you have any questions about these Terms, please contact us:</p>
                        <div className="space-y-4">
                            {[
                                { icon: "🏢", label: "Company", value: "Projukti Sheba" },
                                { icon: "🌐", label: "Website", value: "https://projuktisheba.com" },
                                { icon: "📧", label: "Email", value: "support@projuktisheba.com" },
                                { icon: "📞", label: "Phone", value: "+880 1712-377406" },
                                { icon: "📍", label: "Address", value: "Netrokona, Mymensingh, Bangladesh" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                    <span className="text-xl mr-4">{item.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.label}</p>
                                        <p className="text-gray-700">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;