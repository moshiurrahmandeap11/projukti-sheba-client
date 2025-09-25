import { lazy, Suspense } from "react";
import Loader from "../../comopnents/sharedItems/Loader/Loader";
import Banner from "../../comopnents/Banner/Banner";
import Services from "../Services/Services";
import TipForToday from "./TipForToday/TipForToday";
import OurSolutions from "../../comopnents/OurSolutions/OurSolutions";
import AtAGlance from "../../comopnents/AtAGlance/AtAGlance";
import Industry from "../../comopnents/Industry/Industry";
import Demand from "../../comopnents/Demand/Demand";
import Progress from "../../comopnents/Progress/Progress";
import OurTechnologies from "../../comopnents/OurTechnologies/OurTechnologies";

const Portfolio = lazy(() => import("./Portfolio/Portfolio"));
const Testimonials = lazy(() => import("./Testimonials/Testimonials"));
const About = lazy(() => import("../About/About"));
const BlogInsights = lazy(() => import("./BlogInsight/BlogInsights"));
const Contact = lazy(() => import("../Contact/Contact"));

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
        <AtAGlance></AtAGlance>
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
        </SectionWrapper>
      </Suspense>

      <div className="mt-6">
        <TipForToday />
      </div>
    </div>
  );
};

export default Home;
