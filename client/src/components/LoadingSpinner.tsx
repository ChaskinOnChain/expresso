import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <motion.div
      className="border-t-4 border-blue-500 rounded-full w-28 h-28"
      style={{ borderRightColor: "transparent" }}
      animate={{ rotate: 360 }}
      transition={{ ease: "linear", duration: 1, repeat: Infinity }}
    ></motion.div>
  );
}

export default LoadingSpinner;
