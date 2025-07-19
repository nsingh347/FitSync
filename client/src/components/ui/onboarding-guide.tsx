import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Target, Utensils, Activity, BarChart3, Sparkles, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedAvatar } from "@/components/ui/animated-avatar";

interface OnboardingGuideProps {
  isVisible: boolean;
  onComplete: () => void;
  userName: string;
}

const guideSteps = [
  {
    id: "welcome",
    title: "Welcome to FitSync!",
    subtitle: "Your Personalized Fitness Journey Starts Here",
    description: "Get ready to experience the most advanced, privacy-focused fitness app designed specifically for your needs.",
    animation: "welcome"
  },
  {
    id: "dashboard",
    title: "Your Command Center",
    subtitle: "Everything You Need in One Place",
    description: "Your dashboard shows real-time progress, daily stats, and personalized recommendations - all updated as you complete activities.",
    animation: "dashboard"
  },
  {
    id: "meals",
    title: "Indian Cuisine Made Healthy",
    subtitle: "Authentic Flavors, Optimized Nutrition",
    description: "Enjoy traditional Indian meals designed for your goals. From breakfast parathas to dinner dal - each meal is calorie-tracked and delicious.",
    animation: "meals"
  },
  {
    id: "workouts",
    title: "Adaptive Workout Plans",
    subtitle: "Home, Gym, or Yoga - Your Choice",
    description: "Whether you prefer home workouts, gym sessions, or yoga practice, we adapt to your style and space. Every exercise burns calories and builds progress.",
    animation: "workouts"
  },
  {
    id: "achievements",
    title: "Gamified Progress",
    subtitle: "Unlock Achievements & Stay Motivated",
    description: "Complete meals, finish workouts, and hit milestones to unlock achievements. Watch your progress grow with beautiful animations and rewards.",
    animation: "achievements"
  },
  {
    id: "privacy",
    title: "Your Data Stays Yours",
    subtitle: "Complete Privacy & Security",
    description: "All your data stays on your device. No cloud storage, no data sharing - just pure privacy-first fitness tracking that you control.",
    animation: "privacy"
  }
];

export function OnboardingGuide({ isVisible, onComplete, userName }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const skipGuide = () => {
    onComplete();
  };

  if (!isVisible) return null;

  const currentStepData = guideSteps[currentStep];
  const progress = ((currentStep + 1) / guideSteps.length) * 100;

  const renderAnimation = () => {
    switch (currentStepData.animation) {
      case "welcome":
        return null;

      case "dashboard":
        return (
          <motion.div
            className="w-80 h-80 mx-auto relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              {[
                { icon: Target, label: "Goals", color: "text-green-500" },
                { icon: BarChart3, label: "Progress", color: "text-blue-500" },
                { icon: Utensils, label: "Meals", color: "text-orange-500" },
                { icon: Activity, label: "Workouts", color: "text-purple-500" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="glass-card p-6 flex flex-col items-center justify-center space-y-2"
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  <ProgressRing progress={75 + index * 5} size={40} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "meals":
        return (
          <motion.div
            className="w-80 h-80 mx-auto flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {["🥘", "🍛", "🥗"].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-6xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: Math.cos(index * 120 * Math.PI / 180) * 80,
                    y: Math.sin(index * 120 * Math.PI / 180) * 80,
                  }}
                  transition={{ delay: index * 0.3, type: "spring" }}
                >
                  {emoji}
                </motion.div>
              ))}
              <motion.div
                className="text-8xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🍽️
              </motion.div>
            </div>
          </motion.div>
        );

      case "workouts":
        return (
          <motion.div
            className="w-80 h-80 mx-auto flex items-center justify-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="text-8xl"
                animate={{ 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💪
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 text-2xl"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>
        );

      case "achievements":
        return (
          <motion.div
            className="w-80 h-80 mx-auto flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {["🏆", "🥇", "⭐", "🎖️", "👑"].map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0, 1.2, 1],
                  x: Math.cos(index * 72 * Math.PI / 180) * 100,
                  y: Math.sin(index * 72 * Math.PI / 180) * 100,
                }}
                transition={{ 
                  delay: index * 0.2, 
                  type: "spring",
                  scale: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                {emoji}
              </motion.div>
            ))}
            <motion.div
              className="text-8xl z-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎯
            </motion.div>
          </motion.div>
        );

      case "privacy":
        return (
          <motion.div
            className="w-80 h-80 mx-auto flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="w-40 h-40 border-4 border-green-500 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 20px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔒
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✅
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] bg-background/90 rounded-2xl shadow-xl p-4 overflow-y-auto">
            <motion.div
              className="w-full text-center space-y-6"
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>Step {currentStep + 1} of {guideSteps.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderAnimation()}
                </motion.div>
              </AnimatePresence>

              {/* Content */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    {/* <AnimatedAvatar size="xl" type="user" showPulse /> */}
                    <p className="text-xl text-muted-foreground mt-4">
                      Hi {userName}! 👋
                    </p>
                  </motion.div>
                )}

                <h1 className="text-3xl lg:text-4xl font-bold gradient-text">
                  {currentStepData.title}
                </h1>
                
                <h2 className="text-lg lg:text-xl font-semibold text-muted-foreground">
                  {currentStepData.subtitle}
                </h2>
                
                <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  {currentStepData.description}
                </p>
              </motion.div>

              {/* Navigation */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button
                  variant="ghost"
                  onClick={skipGuide}
                  className="glass-button"
                >
                  Skip Guide
                </Button>
                
                <Button
                  onClick={nextStep}
                  size="lg"
                  className="btn-primary text-lg px-8 py-4 group"
                  disabled={isAnimating}
                >
                  {currentStep === guideSteps.length - 1 ? (
                    <>
                      <CheckCircle className="mr-3 h-5 w-5" />
                      Get Started!
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}