import { lazy, Suspense } from "react";
import Loader from "../../comopnents/sharedItems/Loader/Loader";
import Banner from "../../comopnents/Banner/Banner";
import Services from "../Services/Services";
import TipForToday from "./TipForToday/TipForToday";

const Portfolio = lazy(() => import("./Portfolio/Portfolio"));
const Testimonials = lazy(() => import("./Testimonials/Testimonials"));
const About = lazy(() => import("../About/About"));
const BlogInsights = lazy(() => import("./BlogInsight/BlogInsights"));
const Contact = lazy(() => import("../Contact/Contact"));

const SectionWrapper = ({ children }) => (
  <div className=" rounded-lg my-6">{children}</div>
);

const Home = () => {
  return (
    <div className="flex flex-col">
      <SectionWrapper>
        <Banner />
      </SectionWrapper>

      <SectionWrapper>
        <Services />
      </SectionWrapper>

      <Suspense fallback={<Loader />}>
        <SectionWrapper>
          <Portfolio />
        </SectionWrapper>

        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>
      </Suspense>

      <div className="mt-6">
        <TipForToday />
      </div>
    </div>
  );
};

export default Home;
