import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Star, TrendingUp, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatedAvatar } from "@/components/ui/animated-avatar";
import { ProgressRing } from "@/components/ui/progress-ring";

interface SuccessStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const successStories = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 28,
    location: "Mumbai, India",
    achievement: "Lost 15kg in 6 months",
    story: "I was struggling with weight management after my pregnancy. FitSync's Indian meal plans made it so easy to eat healthy traditional food while losing weight. The home workout plans were perfect since I couldn't go to the gym.",
    beforeStats: { weight: 75, bmi: 28.2, energy: 3 },
    afterStats: { weight: 60, bmi: 22.6, energy: 9 },
    timeframe: "6 months",
    rating: 5,
    quote: "FitSync gave me my confidence back. The Indian meal plans were a game-changer!"
  },
  {
    id: 2,
    name: "Rajesh Patel", 
    age: 35,
    location: "Delhi, India",
    achievement: "Built muscle and improved fitness",
    story: "As a software engineer working long hours, I needed something flexible. FitSync's gym workouts were perfectly structured and the progress tracking kept me motivated. The privacy-first approach was exactly what I wanted.",
    beforeStats: { weight: 68, bmi: 21.5, energy: 4 },
    afterStats: { weight: 72, bmi: 22.8, energy: 8 },
    timeframe: "4 months",
    rating: 5,
    quote: "Finally found a fitness app that respects my privacy and actually works!"
  },
  {
    id: 3,
    name: "Meera Reddy",
    age: 42,
    location: "Bangalore, India", 
    achievement: "Improved overall wellness",
    story: "The yoga workouts and balanced Indian meals helped me find inner peace and physical strength. The achievement system kept me engaged, and I love that my data stays private on my device.",
    beforeStats: { weight: 65, bmi: 24.1, energy: 5 },
    afterStats: { weight: 62, bmi: 23.0, energy: 9 },
    timeframe: "8 months",
    rating: 5,
    quote: "This app transformed not just my body, but my entire relationship with fitness."
  }
];

export function SuccessStoryModal({ isOpen, onClose }: SuccessStoryModalProps) {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const story = successStories[currentStory];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Success Stories</h2>
                  <p className="text-sm text-muted-foreground">Real transformations from real people</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="glass-button">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Story Navigation */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-center space-x-4">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentStory ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Video/Image Section */}
                <div className="space-y-6">
                  <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
                    {/* Simulated video player */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <AnimatedAvatar size="md" type="user" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{story.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 font-medium">{story.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Stats Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 text-center bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/30">
                      <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">Before</h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Weight:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.beforeStats.weight}kg</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">BMI:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.beforeStats.bmi}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Energy:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.beforeStats.energy}/10</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-card p-4 text-center bg-green-50/80 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/30">
                      <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">After</h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Weight:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.afterStats.weight}kg</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">BMI:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.afterStats.bmi}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Energy:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">{story.afterStats.energy}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-primary">{story.achievement}</span>
                    </div>
                    
                    <blockquote className="text-lg italic mb-4 border-l-4 border-primary pl-4 text-gray-800 dark:text-gray-100 font-semibold">
                      "{story.quote}"
                    </blockquote>
                    
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 font-medium">
                      {story.story}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Timeframe: {story.timeframe}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{story.rating}/5 rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <ProgressRing 
                        progress={Math.abs(story.afterStats.weight - story.beforeStats.weight) * 5} 
                        size={60} 
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Weight Change</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing 
                        progress={((story.afterStats.bmi - 18.5) / (25 - 18.5)) * 100} 
                        size={60} 
                        className="mx-auto mb-2"
                        color="secondary"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">BMI Health</p>
                    </div>
                    <div className="text-center">
                      <ProgressRing 
                        progress={story.afterStats.energy * 10} 
                        size={60} 
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Energy Level</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t border-border/50">
              <Button variant="ghost" onClick={prevStory} className="glass-button">
                Previous Story
              </Button>
              
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {currentStory + 1} of {successStories.length}
              </div>
              
              <Button variant="ghost" onClick={nextStory} className="glass-button">
                Next Story
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}