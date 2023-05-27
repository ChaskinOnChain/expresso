import { motion } from "framer-motion";
import brush from "../assets/images/brush.png";
import blog1 from "../assets/images/blog1.png";
import blog2 from "../assets/images/blog2.png";

function SecondHome() {
  return (
    <div
      id="second-home"
      className="relative h-[54rem] w-full bg-orange-500 pl-24 pt-64 pr-[30rem] text-white overflow-hidden"
    >
      <h1 className="text-4xl mb-12">Connect With Other Bloggers</h1>
      <h4 className="text-lg">
        Interact with fellow bloggers by commenting on their posts, enriching
        the discourse and building meaningful connections. Maintain control over
        your content with the option to edit or delete your posts at any time,
        giving you the freedom to evolve your online presence as you grow.
      </h4>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img
          className="absolute top-32 right-[20%] h-32 w-64"
          src={brush}
          alt="brush"
        />
      </motion.div>

      <img
        className="absolute -bottom-[5rem] -right-[10rem] h-[30rem] w-[50rem]"
        src={blog1}
        alt="blog1"
      />
      <motion.div
        initial={{ x: 900, y: 150 }}
        whileInView={{ x: 550, y: 150 }}
        viewport={{ once: true }}
      >
        <img className="absolute" src={blog2} alt="blog2" />
      </motion.div>
    </div>
  );
}

export default SecondHome;
