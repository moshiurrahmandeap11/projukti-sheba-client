import { lazy, Suspense } from 'react';
import Loader from '../../comopnents/sharedItems/Loader/Loader';
import Banner from '../../comopnents/Banner/Banner';
import Services from '../Services/Services';
import TipForToday from './TipForToday/TipForToday';

const Portfolio = lazy(() => import('./Portfolio/Portfolio'));
const Testimonials = lazy(() => import('./Testimonials/Testimonials'));
const About = lazy(() => import('../About/About'));
const BlogInsights = lazy(() => import('./BlogInsight/BlogInsights'));
const Contact = lazy(() => import('../Contact/Contact'));

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <Suspense fallback={<Loader />}>
                <Portfolio />
                <Testimonials />
                <About />
                <BlogInsights />
                <Contact />
            </Suspense>
            <TipForToday />
        </div>
    );
};

export default Home;
