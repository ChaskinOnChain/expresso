import { motion } from "framer-motion";
import brush from "../../assets/images/brush.png";
import blog1 from "../../assets/images/blog1.png";
import blog2 from "../../assets/images/blog2.png";

function ConnectHome() {
  return (
    <div
      id="second-home"
      className=" h-[40rem] w-full bg-orange-500 text-white"
    >
      <div className="relative h-full overflow-y-hidden w-full max-w-[90rem] xl:mx-auto">
        <div className="absolute w-[32rem] top-[3rem] left-[6%] sm:left-[12%] md:left-[20%] lg:left-[30%]  text-center">
          <h1 className="text-4xl mb-8">Connect With Other Bloggers</h1>
          <h4 className="text-xl">
            Interact with fellow bloggers by commenting on their posts,
            enriching the discourse and building meaningful connections.
            Maintain control over your content with the option to edit or delete
            your posts at any time, giving you the freedom to evolve your online
            presence as you grow.
          </h4>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <img
            className="absolute top-[60%] left-[10%] h-32 w-64"
            src={brush}
            alt="brush"
          />
        </motion.div>

        <img
          className="absolute bottom-[-3rem] right-[13rem] h-[30rem] w-[50rem] hidden xl:inline-block scale-75"
          src={blog1}
          alt="blog1"
        />
        <motion.div
          className="h-[30rem] w-[50rem] absolute right-0 bottom-0 md:inline-block hidden"
          initial={{ x: "100%", y: "30%" }}
          whileInView={{ x: "13%", y: "-4%" }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <img className="scale-75" src={blog2} alt="blog2" />
        </motion.div>
      </div>
    </div>
  );
}

export default ConnectHome;
