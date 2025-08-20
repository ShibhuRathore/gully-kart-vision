import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-pink-200 via-fuchsia-400 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Optional blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 items-center gap-12">
        
        {/* LEFT SIDE */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="space-y-5">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.2 }}
            >
              <span className="block text-yellow-100 drop-shadow-xl">
                AI-Powered Hyperlocal
              </span>
              <span className="block text-white">Trend Forecasting Tool</span>
              <span className="block text-white/90">for Fashion Sellers</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Discover what's trending in your region, get smart product recommendations, 
              and create engaging campaigns — all powered by AI.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              onClick={() => navigate("/trends")}
              size="lg"
              className="bg-white text-pink-600 hover:bg-white/90 text-lg px-8 py-6 font-semibold shadow-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              🚀 Start Forecasting Now
            </Button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE (Image) */}
        <motion.div
          className="relative w-full flex justify-center items-center"
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1.1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
        >
          <motion.img
            src="/logo_image.png" // Transparent team image
            alt="Team Illustration"
            className="w-[340px] md:w-[400px] object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500 ease-in-out"
            whileHover={{ scale: 1.15 }}
          />
        </motion.div>

      </div>
    </motion.section>
  );
};

export default HeroSection;
