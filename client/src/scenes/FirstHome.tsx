import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function FirstHome() {
  return (
    <div className="h-screen w-screen bg-red-800 flex justify-center overflow-hidden">
      <div className="text-white mt-48 pt-16 text-center rounded-lg px-16 h-[30%]">
        <h1 className="text-4xl mb-4">
          Express your interests in your unique style
        </h1>
        <h3 className="mb-12">
          Effortlessly craft a blog that's both unique and aesthetically
          pleasing
        </h3>
        <button className="p-4 px-6 bg-orange-500 shadow-lg text-white rounded hover:bg-orange-400 transition duration-500">
          CREATE YOUR BLOG
        </button>
      </div>
      <img
        className="absolute bottom-0 left-[50%] -translate-x-1/2"
        src="/home1.png"
        alt="home logo"
      />
      <img
        className="absolute -left-16 bottom-52 h-52 w-52"
        src="/spoon.png"
        alt="spoon"
      />
      <img
        className="absolute -left-16 -bottom-20 h-52 w-52"
        src="/eggs.png"
        alt="eggs"
      />
      <img
        className="absolute -right-20 -bottom-10 h-52 w-52"
        src="/pie.png"
        alt="pie"
      />
      <img
        className="absolute -right-20 bottom-64 h-52 w-52"
        src="/roll.png"
        alt="roll"
      />
      <button
        onClick={() =>
          document
            .getElementById("second-home")
            .scrollIntoView({ behavior: "smooth" })
        }
        className="absolute right-10 bottom-10 h-16 w-16 rounded-full bg-orange-500 shadow-md hover:shadow-xl"
      >
        <motion.div
          animate={{ y: [1, 5, 1, 5, 1, 5, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: "reverse",
            repeatDelay: 5,
          }}
        >
          <FontAwesomeIcon
            className="text-white text-3xl font-bold"
            icon={faChevronDown}
          />
        </motion.div>
      </button>
    </div>
  );
}

export default FirstHome;
