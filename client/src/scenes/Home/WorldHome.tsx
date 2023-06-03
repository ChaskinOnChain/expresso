import fam from "../../assets/images/fam.png";
import world from "../../assets/images/world.png";
import docs from "../../assets/images/docs.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function WorldHome() {
  return (
    <div className="h-[40rem] w-full bg-red-400 text-white overflow-hidden relative z-0">
      <div className="relative w-full max-w-[90rem] xl:mx-auto h-full overflow-hidden">
        <div className="absolute w-[32rem] top-[6rem] left-[4%] sm:left-[12%] md:left-[20%] lg:left-[30%] text-center">
          <h1 className="text-4xl mb-12">
            Amplify your voice and reach millions of people worldwide
          </h1>
          <p className="text-lg mb-20">
            Whether pouring out your expertise, brewing the latest news, or
            whatever's percolating in your mind, you're in good company on
            Expresso. Sign up to taste the richness of thoughts and discover why
            millions have chosen to distill their passions here.
          </p>
          <Link to="/login">
            <button className="p-4 px-6 bg-slate-700 text-white rounded hover:bg-slate-500 transition duration-500">
              CREATE YOUR BLOG
            </button>
          </Link>
        </div>
        <motion.div
          className="absolute hidden xl:block"
          initial={{ x: "-100%", y: "170%" }}
          whileInView={{ x: "100%", y: "170%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img src={fam} alt="fam" />
        </motion.div>
        <motion.div
          className="absolute hidden lg:inline-block scale-75"
          initial={{ x: "800%", y: "190%" }}
          whileInView={{ x: "450%", y: "190%" }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <img src={docs} alt="docs" />
        </motion.div>
      </div>
      <img
        className="absolute top-2 left-0 w-full h-full z-[-1]"
        src={world}
        alt="world"
      />
    </div>
  );
}

export default WorldHome;
