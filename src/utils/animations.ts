import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export const moodBounce = {
  hover: { 
    y: -5,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 10
    } 
  },
  tap: { 
    scale: 0.95 
  }
};