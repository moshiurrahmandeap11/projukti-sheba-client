import React, { Suspense } from 'react';
import Banner from '../../comopnents/Banner/Banner';
import Services from '../Services/Services';
import Portfolio from './Portfolio/Portfolio';
import Testimonials from './Testimonials/Testimonials';
import About from '../About/About';
import Contact from '../Contact/Contact';
import BlogInsights from './BlogInsight/BlogInsights';
import TipForToday from './TipForToday/TipForToday';
import Loader from '../../comopnents/sharedItems/Loader/Loader';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Suspense fallback={<Loader></Loader>}>
                <Portfolio></Portfolio>
                <Testimonials></Testimonials>
                <About></About>
                <BlogInsights></BlogInsights>
                <Contact></Contact>
            </Suspense>
            <TipForToday></TipForToday>
        </div>
    );
};

export default Home;