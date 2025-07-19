import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for the element to highlight
  position: "top" | "bottom" | "left" | "right" | "center";
  showOnLoad?: boolean;
}

interface InteractiveTutorialProps {
  steps: TutorialStep[];
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function InteractiveTutorial({ steps, isVisible, onClose, onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (isVisible && steps[currentStep]?.target) {
      const updatePosition = () => {
        const element = document.querySelector(steps[currentStep].target!);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetPosition({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          });
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [currentStep, steps, isVisible]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  if (!isVisible || steps.length === 0) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!step.target) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const { x, y, width, height } = targetPosition;
    const padding = 20;

    switch (step.position) {
      case 'top':
        return {
          top: y - padding,
          left: x + width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: y + height + padding,
          left: x + width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: y + height / 2,
          left: x - padding,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: y + height / 2,
          left: x + width + padding,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Spotlight effect */}
          {step.target && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute pointer-events-none"
              style={{
                left: targetPosition.x - 8,
                top: targetPosition.y - 8,
                width: targetPosition.width + 16,
                height: targetPosition.height + 16,
                background: 'transparent',
                border: '3px solid rgb(124, 58, 237)',
                borderRadius: '12px',
                boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.6)',
                animation: 'pulse 2s infinite'
              }}
            />
          )}

          {/* Tutorial tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute pointer-events-auto glass-card p-6 max-w-sm w-full mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
            style={getTooltipPosition()}
          >
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
                <button
                  onClick={skipTutorial}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
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

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{step.title}</h3>
              </div>
              
              <p className="text-gray-900 dark:text-white leading-relaxed font-medium">
                {step.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="glass-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTutorial}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Skip
                </Button>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}