import { motion } from "framer-motion";
import { User, Zap, Crown, Target } from "lucide-react";

interface AnimatedAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  type?: "user" | "coach" | "expert" | "achievement";
  className?: string;
  showPulse?: boolean;
  children?: React.ReactNode;
}

const avatarVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const iconMap = {
  user: User,
  coach: Zap,
  expert: Crown,
  achievement: Target
};

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

const iconSizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8", 
  xl: "w-12 h-12"
};

export function AnimatedAvatar({ 
  size = "md", 
  type = "user", 
  className = "", 
  showPulse = false,
  children 
}: AnimatedAvatarProps) {
  const Icon = iconMap[type];

  return (
    <div className="relative inline-block">
      {showPulse && (
        <motion.div
          className={`absolute inset-0 rounded-full bg-primary/20 ${sizeMap[size]}`}
          variants={pulseVariants}
          animate="pulse"
        />
      )}
      
      <motion.div
        className={`
          relative ${sizeMap[size]} rounded-full 
          bg-gradient-to-br from-primary to-secondary
          flex items-center justify-center
          shadow-lg hover-glow cursor-pointer
          ${className}
        `}
        variants={avatarVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        {children ? (
          children
        ) : (
          <Icon className={`${iconSizeMap[size]} text-white`} />
        )}
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  );
}