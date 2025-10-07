import React from 'react';

const About3 = () => {
    return (
        <div className=" bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 lg:mb-24">
                    <div className="text-sm text-gray-500 tracking-widest uppercase mb-4">OURCOMMITMENT</div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Smart Solutions for Growth</h1>
                    <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
                        We provide customized software solutions to enhance business performance and create<br />
                        long-term impact across local and global markets
                    </p>
                </div>

                {/* Vision and Mission Section */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Vision Column */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Vision</h2>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                To be a leading software company that<br />
                                drives local and global business
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We aim to empower businesses<br />
                                through innovation, excellence, and<br />
                                technology, creating impactful solu-<br />
                                tions that scale across industries and<br />
                                global markets.
                            </p>
                        </div>
                    </div>

                    {/* Mission Column */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Mission</h2>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                We deliver scalable, secure software<br />
                                solutions tailored to businesses world-<br />
                                wide. Using modern tech, cloud archi-<br />
                                tectures, agile methods, and AI auto-<br />
                                mation, we optimize performance and<br />
                                security,
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We build lasting partnerships that drive
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About3;