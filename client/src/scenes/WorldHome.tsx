import fam from "../assets/images/fam.png";
import world from "../assets/images/world.png";
import docs from "../assets/images/docs.png";
import { motion } from "framer-motion";

function WorldHome() {
  return (
    <div className="relative h-[40rem] w-full bg-red-400 text-white overflow-hidden pt-[10%] pl-[25%] pr-[15%] text-center z-0">
      <h1 className="text-4xl mb-12">
        Amplify your voice and reach millions of people worldwide
      </h1>
      <p className="text-lg mb-20">
        Whether pouring out your expertise, brewing the latest news, or
        whatever's percolating in your mind, you're in good company on Expresso.
        Sign up to taste the richness of thoughts and discover why millions have
        chosen to distill their passions here.
      </p>
      <button className="p-4 px-6 bg-slate-700 text-white rounded hover:bg-slate-500 transition duration-500">
        CREATE YOUR BLOG
      </button>
      <motion.div
        className="absolute"
        initial={{ x: -530, y: -450 }}
        whileInView={{ x: -250, y: -450 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75 }}
      >
        <img src={fam} alt="fam" />
      </motion.div>
      <motion.div
        className="absolute"
        initial={{ x: 800, y: -450 }}
        whileInView={{ x: 625, y: -450 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <img className="scale-75" src={docs} alt="docs" />
      </motion.div>
      <img
        className="absolute top-2 left-0 w-full h-full z-[-1]"
        src={world}
        alt="world"
      />
    </div>
  );
}

export default WorldHome;
