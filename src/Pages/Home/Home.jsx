import { useLocation } from "react-router-dom"
import Resrvation from "../Resrvation/Resrvation"
import AboutUS from "./AboutUs/AboutUS"
import Gallery from "./Gallery/Gallery"
import Hero from "./Hero/Hero"
import Social from "./SocialMedia/Social"
import { useEffect } from "react"
import { Element, scroller } from "react-scroll"
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
    <>
      <Hero />
      <Element name="aboutUs">
        <AboutUS />
      </Element>
      <Resrvation />
      <Gallery />
      <Social />
    </>
  )
}

export default Home