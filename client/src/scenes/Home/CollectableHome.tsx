import { motion } from "framer-motion";
import watch from "../../assets/images/watch.png";
import phone from "../../assets/images/phone.png";
import camera from "../../assets/images/camera.png";

function CollectableHome() {
  return (
    <div className="relative h-[40rem] w-full bg-cyan-800 text-white overflow-hidden pl-24 pt-20 pr-[30rem]">
      <h1 className="text-4xl mb-8">
        Unlease the Power of Digital Collectables
      </h1>
      <p className="text-lg">
        Connect with Your Fans through Unique Digital Collectibles. As your blog
        gains popularity, your audience won't just be reading your work, they'll
        have the opportunity to collect digital items uniquely associated with
        your content. These items serve as mementos of their support and act as
        a bridge between you and your fans.
      </p>
      <motion.div
        className="absolute"
        initial={{ x: -285, y: 15 }}
        whileInView={{ x: 150, y: 15 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75 }}
      >
        <img src={phone} alt="watch" />
      </motion.div>

      <img
        className="absolute bottom-20 left-[40rem]"
        src={watch}
        alt="money"
      />
      <motion.div
        className="absolute right-5 top-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75 }}
      >
        <img src={camera} alt="camera" />
      </motion.div>
    </div>
  );
}

export default CollectableHome;
