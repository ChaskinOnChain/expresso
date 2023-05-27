import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoLight from "../assets/images/LogoLightTrans.png";
import logoDark from "../assets/images/LogoDarkTrans.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`h-20 w-full flex justify-between items-center fixed transition duration-500 z-[100] ${
        scrollPosition > 50 ? "bg-white pr-44" : "bg-red-800"
      }`}
    >
      <div className="flex items-center cursor-pointer">
        <img
          className="h-20 w-20"
          src={scrollPosition > 50 ? logoLight : logoDark}
          alt="logo"
        />
        <span
          className={`text-xl ${
            scrollPosition > 50 ? "text-black" : "text-white"
          }`}
        >
          Expresso
        </span>
      </div>
      <div className="mr-6">
        <Link to="/login">
          <button
            className={`mr-4 hover:text-neutral-200  ${
              scrollPosition > 50
                ? "text-black hover:text-orange-500"
                : "text-white"
            }`}
          >
            SIGN IN
          </button>
        </Link>
        <motion.button
          className="absolute top-3 right-4 p-4 bg-orange-500 text-white rounded hover:bg-orange-400"
          initial={{ y: -100 }}
          animate={{ y: scrollPosition > 50 ? 0 : -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          CREATE YOUR BLOG
        </motion.button>
      </div>
    </div>
  );
}

export default Navbar;
