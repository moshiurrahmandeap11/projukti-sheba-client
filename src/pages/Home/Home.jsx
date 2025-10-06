import { lazy, Suspense } from "react";
import Loader from "../../comopnents/sharedItems/Loader/Loader";
import Banner from "../../comopnents/Banner/Banner";
import Services from "../Services/Services";
import OurSolutions from "../../comopnents/OurSolutions/OurSolutions";
import Industry from "../../comopnents/Industry/Industry";
import Demand from "../../comopnents/Demand/Demand";
import Progress from "../../comopnents/Progress/Progress";
import OurTechnologies from "../../comopnents/OurTechnologies/OurTechnologies";
import TextTestimonials from "./Testimonials/TextTestimonials/TextTestimonials";
import Overview from "../../comopnents/Overview/Overview";

const Portfolio = lazy(() => import("./Portfolio/Portfolio"));
const Testimonials = lazy(() => import("./Testimonials/Testimonials"));

const SectionWrapper = ({ children }) => (
  <div className=" rounded-lg">{children}</div>
);

const Home = () => {
  return (
    <div className="flex flex-col">
      <SectionWrapper>
        <Banner />
      </SectionWrapper>

      <SectionWrapper>
        <Services></Services>
        <OurSolutions></OurSolutions>
      </SectionWrapper>

      <Suspense fallback={<Loader />}>
        <SectionWrapper>
          <Portfolio />
          <Industry></Industry>
          <Demand></Demand>
          <Progress></Progress>
          <OurTechnologies></OurTechnologies>
        </SectionWrapper>

        <SectionWrapper>
          <Testimonials />
          <TextTestimonials></TextTestimonials>
          <Overview></Overview>
        </SectionWrapper>
      </Suspense>
    </div>
  );
};

export default Home;
