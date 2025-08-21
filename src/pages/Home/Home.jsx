import React from 'react';
import Banner from '../../comopnents/Banner/Banner';
import Services from '../Services/Services';
import Portfolio from './Portfolio/Portfolio';
import Testimonials from './Testimonials/Testimonials';
import About from '../About/About';
import Contact from '../Contact/Contact';
import BlogInsights from './BlogInsight/BlogInsights';
import TipForToday from './TipForToday/TipForToday';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Portfolio></Portfolio>
            <Testimonials></Testimonials>
            <About></About>
            <BlogInsights></BlogInsights>
            <Contact></Contact>
            <TipForToday></TipForToday>
        </div>
    );
};

export default Home;