import { useState, useEffect } from "react";
import "./UpScroller.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = Math.floor((scrollPosition / (document.body.scrollHeight - windowHeight)) * 100);
      setIsVisible(scrollPosition > windowHeight / 6.5);
      setScrollPercentage(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressBorder = {
    backgroundImage: `linear-gradient(to bottom, #000 ${scrollPercentage}%, transparent ${scrollPercentage}%)`
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""} ${isHovered ? "hovered" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isVisible ? progressBorder : {}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M5 15 l7-7 7 7 " />
      </svg>
    </button>
  );
}

export default ScrollToTop;
