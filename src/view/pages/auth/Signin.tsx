import HAPPY_MAN from "../../../assets/happy_man.svg";
import SCRIBBLE from "../../../assets/scribble.svg";
import LOGO from "../../../assets/leeta_main_logo.svg";
import LEFT_IMAGE from "../../../assets/popup1.svg";
import RIGHT_IMAGE from "../../../assets/popup2.svg";
import { motion } from "framer-motion";

import LoginForm from "../../components/form/LoginForm";

const Signin: React.FC = () => {
  return (
    <header className="pt-10 md:mt-0 h-auto md:min-h-[80vh] flex flex-col items-center bg-[#F0F0F0] h-screen relative">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
        className="logo absolute top-8 left-8"
      >
        <img src={LOGO} alt="Logo" className="w-20 h-auto md:w-28" />
      </motion.div>

      <div className="inner block md:flex w-full justify-center items-center mt-16 md:mt-28 relative">
        <motion.section
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="left w-full md:w-1/2 p-6 md:p-12"
        >
          <LoginForm />
        </motion.section>
        <div className="right w-full md:w-1/2 my-10 md:my-0 flex justify-center relative">
          <motion.div className="overflow-hidden max-w-[475px] h-[607px] rounded-xl relative">
            <img
              className="absolute right-8"
              src={SCRIBBLE}
              alt="scribble icon"
            />
            <motion.img
              src={HAPPY_MAN}
              alt="business man"
              className="h-full object-cover pt-3"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>
          <motion.img
            src={LEFT_IMAGE}
            alt="Left decorative"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
            className="absolute left-0 bottom-0  h-auto"
          />
          <motion.img
            src={RIGHT_IMAGE}
            alt="Right decorative"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
            className="absolute right-0 top-0  h-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Signin;
