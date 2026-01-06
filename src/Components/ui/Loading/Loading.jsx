import logo from "../../../assets/images/Watchix.png";
import { motion } from "framer-motion";
export default function Loading() {
  return (
    <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-200 dark:bg-slate-900 z-50">
      <motion.div
        initial={{ scale: 0.97, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="flex gap-2 text-main items-center"
      >
        <img className="w-12" src={logo} alt="loading" />
        <h3 className="text-4xl font-sans uppercase font-bold">Watchoria</h3>
      </motion.div>
    </div>
  );
}
