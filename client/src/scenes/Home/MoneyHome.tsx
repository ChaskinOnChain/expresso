import { motion } from "framer-motion";
import money from "../../assets/images/money.png";
import calc from "../../assets/images/calc.png";
import computer from "../../assets/images/computer.png";

function MoneyHome() {
  return (
    <div className=" h-[40rem] w-full bg-emerald-600 text-white">
      <div className="relative w-full max-w-[90rem] xl:mx-auto h-full">
        <div className="absolute w-[32rem] top-[12rem] left-[6%] sm:left-[12%] md:left-[20%] lg:left-[30%] text-center">
          <h1 className="text-4xl mb-8">Earn Money</h1>
          <p className="text-lg">
            Monetize Your Efforts With Ethereum. Simply add your Ethereum
            address to your account, and reap the benefits of your hard work. As
            your blog gains popularity, you'll earn ETH directly from your fans.
            Thus, your passion not only reaches a wider audience, but also
            rewards you financially.
          </p>
        </div>
        <motion.div
          className="absolute hidden xl:inline-block"
          initial={{ x: -850, y: -200 }}
          whileInView={{ x: "-35%", y: -200 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img className="scale-50" src={computer} alt="computer" />
        </motion.div>

        <img
          className="absolute top-[2rem] right-[15%]"
          src={money}
          alt="money"
        />
        <motion.div
          className="absolute hidden xl:inline-block"
          initial={{ x: "200%", y: 200 }}
          whileInView={{ x: "190%", y: 125 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img className="scale-75" src={calc} alt="calc" />
        </motion.div>
      </div>
    </div>
  );
}

export default MoneyHome;
