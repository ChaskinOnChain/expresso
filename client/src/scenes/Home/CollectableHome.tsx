import { motion } from "framer-motion";
import watch from "../../assets/images/watch.png";
import phone from "../../assets/images/phone.png";
import camera from "../../assets/images/camera.png";

function CollectableHome() {
  return (
    <div className="h-[40rem] w-full bg-cyan-800 text-white">
      <div className="relative h-full w-full overflow-hidden max-w-[90rem] xl:mx-auto">
        <div className="absolute w-[32rem] top-[12rem] left-[6%] sm:left-[12%] md:left-[20%] lg:left-[30%] text-center">
          <h1 className="text-4xl mb-8">
            Unlease the Power of Digital Collectables
          </h1>
          <p className="text-lg">
            Connect with Your Fans through Unique Digital Collectibles. As your
            blog gains popularity, your audience won't just be reading your
            work, they'll have the opportunity to collect digital items uniquely
            associated with your content. These items serve as mementos of their
            support and act as a bridge between you and your fans.
          </p>
        </div>
        <motion.div
          className="absolute lg:block hidden"
          initial={{ x: "-100%", y: "50%" }}
          whileInView={{ x: 0, y: "50%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img src={phone} alt="watch" />
        </motion.div>

        <img
          className="absolute bottom-[10px] left-[6%] sm:left-[12%] md:left-[20%] lg:left-[30%]"
          src={watch}
          alt="money"
        />
        <motion.div
          className="absolute xl:block hidden right-5 top-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img src={camera} alt="camera" />
        </motion.div>
      </div>
    </div>
  );
}

export default CollectableHome;
