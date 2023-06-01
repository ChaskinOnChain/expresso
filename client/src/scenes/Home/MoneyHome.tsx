import { motion } from "framer-motion";
import money from "../../assets/images/money.png";
import calc from "../../assets/images/calc.png";
import computer from "../../assets/images/computer.png";

function MoneyHome() {
  return (
    <div className="relative h-[40rem] w-full bg-emerald-600 text-white overflow-hidden pt-[8%] pl-[50%] pr-[10%]">
      <h1 className="text-4xl mb-8">Earn Money</h1>
      <p className="text-lg">
        Monetize Your Efforts With Ethereum. Simply add your Ethereum address to
        your account, and reap the benefits of your hard work. As your blog
        gains popularity, you'll earn ETH directly from your fans. Thus, your
        passion not only reaches a wider audience, but also rewards you
        financially.
      </p>
      <motion.div
        className="absolute"
        initial={{ x: -850, y: -275 }}
        whileInView={{ x: -600, y: -275 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75 }}
      >
        <img src={computer} alt="computer" />
      </motion.div>

      <img className="absolute top-5 right-5" src={money} alt="money" />
      <motion.div
        className="absolute"
        initial={{ x: 500, y: -50 }}
        whileInView={{ x: 0, y: -50 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75 }}
      >
        <img className="scale-75" src={calc} alt="calc" />
      </motion.div>
    </div>
  );
}

export default MoneyHome;
