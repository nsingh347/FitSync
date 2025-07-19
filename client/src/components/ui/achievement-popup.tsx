import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Target, Flame, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "streak" | "goal" | "milestone" | "perfect" | "champion" | "beginner";
  points: number;
  icon?: React.ReactNode;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  isVisible: boolean;
  onClose: () => void;
}

const achievementConfig = {
  streak: {
    icon: Flame,
    color: "text-orange-500",
    bgColor: "from-orange-500/20 to-red-500/20",
    glowColor: "shadow-orange-500/50"
  },
  goal: {
    icon: Target,
    color: "text-green-500", 
    bgColor: "from-green-500/20 to-emerald-500/20",
    glowColor: "shadow-green-500/50"
  },
  milestone: {
    icon: Star,
    color: "text-blue-500",
    bgColor: "from-blue-500/20 to-purple-500/20", 
    glowColor: "shadow-blue-500/50"
  },
  perfect: {
    icon: Award,
    color: "text-purple-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    glowColor: "shadow-purple-500/50"
  },
  champion: {
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "from-yellow-500/20 to-orange-500/20",
    glowColor: "shadow-yellow-500/50"
  },
  beginner: {
    icon: Zap,
    color: "text-primary",
    bgColor: "from-primary/20 to-secondary/20",
    glowColor: "shadow-primary/50"
  }
};

export function AchievementPopup({ achievement, isVisible, onClose }: AchievementPopupProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (isVisible && achievement) {
      // Generate confetti particles
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]
      }));
      setConfetti(particles);
    }
  }, [isVisible, achievement]);

  if (!achievement) return null;

  const config = achievementConfig[achievement.type];
  const Icon = achievement.icon ? () => achievement.icon : config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: particle.color,
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              initial={{ scale: 0, rotate: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                y: [0, -100, 100]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -10, y: 50 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0, rotate: 10, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="relative p-8 m-4 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background with glass effect */}
            <div className={`
              absolute inset-0 rounded-3xl bg-gradient-to-br ${config.bgColor}
              backdrop-blur-xl border border-white/20
              ${config.glowColor} shadow-2xl
            `} />
            
            {/* Content */}
            <div className="relative text-center space-y-6">
              {/* Icon with animated rings */}
              <div className="relative flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  {/* Pulsing rings */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${config.color} bg-current/10`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className={`absolute inset-0 rounded-full ${config.color} bg-current/20`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  
                  {/* Main icon */}
                  <div className={`
                    relative w-20 h-20 rounded-full bg-gradient-to-br ${config.bgColor}
                    flex items-center justify-center border-2 border-white/30
                  `}>
                    <Icon className={`w-10 h-10 ${config.color}`} />
                  </div>
                </motion.div>
              </div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <h2 className="text-2xl font-bold text-white">Achievement Unlocked!</h2>
                <h3 className="text-xl font-semibold text-white/90">{achievement.title}</h3>
                <p className="text-white/80 leading-relaxed">{achievement.description}</p>
                
                {/* Points badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2"
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">+{achievement.points} points</span>
                </motion.div>
              </motion.div>

              {/* Action button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                >
                  Awesome!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}