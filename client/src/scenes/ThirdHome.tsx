import { motion } from "framer-motion";
import money from "../assets/images/money.png";
import calc from "../assets/images/calc.png";
import computer from "../assets/images/computer.png";

function ThirdHome() {
  return (
    <div className="relative h-[54rem] w-full bg-emerald-600 text-white overflow-hidden pt-[25%] pl-[50%] pr-[10%]">
      <h1 className="text-4xl mb-8">Earn Money</h1>
      <p>
        Monetize Your Efforts With Ethereum. Simply add your Ethereum address to
        your account, and reap the benefits of your hard work. As your blog
        gains popularity, you'll earn ETH directly from your fans. Thus, your
        passion not only reaches a wider audience, but also rewards you
        financially.
      </p>
      <motion.div
        className="absolute"
        initial={{ x: -100, y: -300 }}
        whileInView={{ x: -550, y: -300 }}
        viewport={{ once: true }}
      >
        <img src={computer} alt="computer" />
      </motion.div>

      <img className="absolute bottom-60 right-2" src={money} alt="money" />
      <motion.div
        className="absolute"
        initial={{ x: 500, y: 0 }}
        whileInView={{ x: 0, y: 0 }}
        viewport={{ once: true }}
      >
        <img className="scale-75" src={calc} alt="calc" />
      </motion.div>
    </div>
  );
}

export default ThirdHome;
