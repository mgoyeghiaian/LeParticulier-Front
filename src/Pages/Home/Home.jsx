import { useLocation } from "react-router-dom"
import Resrvation from "./Resrvation/Resrvation"
import Gallery from "./Gallery/Gallery"
import Hero from "./Hero/Hero"
import Social from "./SocialMedia/Social"
import { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import AboutUS from "./AboutUs/AboutUs"
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      scroller.scrollTo(hash, {
        duration: 500,
        smooth: true,
      });
    }
  }, [location.hash]);

  return (
    <div className="bg-[#E5E1DA]">
      <Hero />
      <Element name="aboutUs">
        <AboutUS />
      </Element>
      <Element name="resrvation">
        <Resrvation />
      </Element>
      <Gallery />
      <Social />
    </div>
  )
}

export default Home