import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, LogOut, Plus, Target, Droplets, TrendingUp, Calendar, 
  Flame, Trophy, Star, Zap, Activity, User, Settings, Bell,
  ChevronRight, Award, Crown, Heart, Sparkles, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { generateMealPlan } from "@/lib/meal-plans";
import { generateWorkoutPlan } from "@/lib/workout-plans";
import { getDailyQuote } from "@/lib/quotes";
import { AnimatedAvatar } from "@/components/ui/animated-avatar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AchievementPopup } from "@/components/ui/achievement-popup";
import { InteractiveTutorial } from "@/components/ui/interactive-tutorial";
import { NotificationSystem, useNotifications } from "@/components/ui/notification-system";
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animations";
import type { UserProfile, ProgressEntry } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [userProfile, , removeProfile] = useLocalStorage<UserProfile | null>("fitSyncProfile", null);
  const [progressData, setProgressData] = useLocalStorage<ProgressEntry | null>("fitSyncProgress", null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const { toast } = useToast();
  const { notifications, addNotification, removeNotification } = useNotifications();

  const heroAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const mealAnimation = useScrollAnimation();
  const workoutAnimation = useScrollAnimation();

  // Ensure dashboard content is visible during tutorial and on first load
  useEffect(() => {
    // Force visibility of all dashboard content immediately and when tutorial is shown
    const forceVisibility = () => {
      const dashboardContent = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
      dashboardContent.forEach((element) => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.visibility = 'visible';
        element.classList.add('visible');
      });
    };

    // Force visibility immediately
    forceVisibility();
    
    // Also force visibility when tutorial is shown
    if (showTutorial) {
      forceVisibility();
    }
  }, [showTutorial]);
  
  const caloriesConsumed = useCountUp(progressData?.caloriesConsumed || 0, 1500, statsAnimation.isVisible);
  const caloriesBurned = useCountUp(progressData?.caloriesBurned || 0, 1500, statsAnimation.isVisible);
  const waterGlasses = useCountUp(progressData?.waterGlasses || 0, 1000, statsAnimation.isVisible);

  useEffect(() => {
    if (!userProfile) {
      setLocation("/");
      return;
    }

    // Initialize today's progress if not exists
    if (!progressData) {
      const initialProgress: ProgressEntry = {
        id: crypto.randomUUID(),
        userId: userProfile.id,
        date: new Date().toISOString().split('T')[0],
        weight: userProfile.weight,
        caloriesConsumed: 0,
        caloriesBurned: 0,
        waterGlasses: 6,
        completedMeals: [],
        completedWorkouts: [],
      };
      setProgressData(initialProgress);
    }

    // Show welcome notification for new users
    const hasSeenWelcome = localStorage.getItem('fitSyncWelcomeSeen');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        addNotification({
          type: "achievement",
          title: "Welcome to FitSync!",
          message: "Your fitness journey starts today. Let's make it amazing!",
          duration: 5000,
          action: {
            label: "Start Tutorial",
            onClick: () => setShowTutorial(true)
          }
        });
        localStorage.setItem('fitSyncWelcomeSeen', 'true');
      }, 1000);
    }

    // Ensure all dashboard sections are visible after a delay
    setTimeout(() => {
      const allSections = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
      allSections.forEach((section) => {
        section.classList.add('visible');
        (section as HTMLElement).style.opacity = '1';
        (section as HTMLElement).style.visibility = 'visible';
      });
    }, 500);
  }, [userProfile?.id, setLocation, setProgressData, addNotification]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout? This will clear all your data.")) {
      removeProfile();
      setLocation("/");
      toast({
        title: "Logged out successfully",
        description: "Your data has been cleared from this device.",
      });
    }
  };

  const calculateBMI = () => {
    if (!userProfile) return { value: 0, category: "", color: "text-gray-500" };
    
    const heightInMeters = userProfile.height / 100;
    const bmi = userProfile.weight / (heightInMeters * heightInMeters);
    
    let category = "";
    let color = "";
    
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }
    
    return { value: bmi.toFixed(1), category, color };
  };

  const updateMealCalories = (mealId: string, calories: number, checked: boolean) => {
    if (!progressData) return;

    let newCaloriesConsumed: number;
    let newCompletedMeals: string[];

    if (checked) {
      newCaloriesConsumed = progressData.caloriesConsumed + calories;
      newCompletedMeals = [...progressData.completedMeals, mealId];
      
      // Check for achievements
      if (newCompletedMeals.length === 3) {
        triggerAchievement({
          id: "meal_complete",
          title: "Meal Master!",
          description: "You've completed all your meals for today!",
          type: "perfect",
          points: 50
        });
      }
    } else {
      newCaloriesConsumed = progressData.caloriesConsumed - calories;
      newCompletedMeals = progressData.completedMeals.filter(id => id !== mealId);
    }

    setProgressData({
      ...progressData,
      caloriesConsumed: newCaloriesConsumed,
      completedMeals: newCompletedMeals
    });

    addNotification({
      type: checked ? "success" : "info",
      title: checked ? "Meal Logged!" : "Meal Removed",
      message: `${checked ? "Added" : "Removed"} ${calories} calories ${checked ? "to" : "from"} your daily intake`,
      duration: 3000
    });
  };

  const updateWorkoutCalories = (workoutId: string, calories: number, checked: boolean) => {
    if (!progressData) return;

    let newCaloriesBurned: number;
    let newCompletedWorkouts: string[];

    if (checked) {
      newCaloriesBurned = progressData.caloriesBurned + calories;
      newCompletedWorkouts = [...progressData.completedWorkouts, workoutId];
      
      // Check for achievements
      if (newCompletedWorkouts.length === 1) {
        triggerAchievement({
          id: "first_workout",
          title: "First Step!",
          description: "You've completed your first workout today!",
          type: "beginner",
          points: 25
        });
      } else if (newCompletedWorkouts.length >= 3) {
        triggerAchievement({
          id: "workout_warrior",
          title: "Workout Warrior!",
          description: "You've completed all your workouts for today!",
          type: "champion",
          points: 100
        });
      }
    } else {
      newCaloriesBurned = progressData.caloriesBurned - calories;
      newCompletedWorkouts = progressData.completedWorkouts.filter(id => id !== workoutId);
    }

    setProgressData({
      ...progressData,
      caloriesBurned: newCaloriesBurned,
      completedWorkouts: newCompletedWorkouts
    });

    addNotification({
      type: checked ? "success" : "info",
      title: checked ? "Workout Complete!" : "Workout Unchecked",
      message: `${checked ? "Burned" : "Removed"} ${calories} calories ${checked ? "from your workout" : "from daily burn"}`,
      duration: 3000
    });
  };

  const triggerAchievement = (achievement: any) => {
    setCurrentAchievement(achievement);
    setShowAchievement(true);
    
    addNotification({
      type: "achievement",
      title: "Achievement Unlocked!",
      message: achievement.title,
      duration: 4000
    });
  };

  const tutorialSteps = [
    {
      id: "welcome",
      title: "Welcome to Your Dashboard!",
      description: "This is your personal fitness command center. Let me show you around!",
      position: "center" as const
    },
    {
      id: "profile",
      title: "Your Profile",
      description: "Here you can see your basic info and BMI calculation.",
      target: "[data-tutorial='profile']",
      position: "bottom" as const
    },
    {
      id: "progress",
      title: "Daily Progress",
      description: "Track your calories, water intake, and daily goals here.",
      target: "[data-tutorial='progress']",
      position: "left" as const
    },
    {
      id: "meals",
      title: "Meal Plans",
      description: "Your personalized Indian meal plans are here. Check them off as you complete them!",
      target: "[data-tutorial='meals']",
      position: "top" as const
    },
    {
      id: "workouts",
      title: "Workout Plans",
      description: "Your customized workout routines based on your preferences.",
      target: "[data-tutorial='workouts']",
      position: "top" as const
    }
  ];

  if (!userProfile || !progressData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  const mealPlan = generateMealPlan(userProfile);
  const workoutPlan = generateWorkoutPlan(userProfile.goal, userProfile.activityLevel, userProfile.workoutType);
  const dailyQuote = getDailyQuote();
  const bmiData = calculateBMI();

  // Combine all meals into a single array for easier tracking
  const allMeals = [
    ...mealPlan.breakfast.map(meal => ({ ...meal, type: 'Breakfast' })),
    ...mealPlan.lunch.map(meal => ({ ...meal, type: 'Lunch' })),
    ...mealPlan.dinner.map(meal => ({ ...meal, type: 'Dinner' }))
  ];

  const calorieGoal = userProfile.goal === "weight-loss"
    ? 1800
    : userProfile.goal === "muscle-gain"
    ? 2500
    : 2200;
  const calorieProgress = (progressData.caloriesConsumed / calorieGoal) * 100;
  const waterProgress = (progressData.waterGlasses / 8) * 100;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/3 pattern-dots" />
      
      {/* Notification system */}
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />
      
      {/* Achievement popup */}
      <AchievementPopup
        achievement={currentAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
      
      {/* Interactive tutorial */}
      <InteractiveTutorial
        steps={tutorialSteps}
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={() => {
          setShowTutorial(false);
          addNotification({
            type: "success",
            title: "Tutorial Complete!",
            message: "You're all set to start your fitness journey!",
            duration: 4000
          });
        }}
      />

      {/* Header */}
      <header className="relative z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              {/* <AnimatedAvatar size="md" type="user" showPulse /> */}
              <div>
                <h1 className="text-2xl font-bold gradient-text">Welcome back, {userProfile.name}!</h1>
                <p className="text-sm text-muted-foreground">Let's crush your goals today</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="glass-button"
                onClick={() => setShowTutorial(true)}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Hero Stats Section */}
        <motion.section
          ref={heroAnimation.ref}
          className={`scroll-reveal ${heroAnimation.isVisible ? 'visible' : 'visible'}`}
          style={{ opacity: 1, visibility: 'visible' }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="interactive-card glass-card p-6" data-tutorial="profile">
              <div className="flex items-center space-x-4">
                <AnimatedAvatar size="md" type="expert" />
                <div>
                  <div className="text-2xl font-bold">{bmiData.value}</div>
                  <div className="text-sm text-muted-foreground">BMI</div>
                  <div className={`text-xs font-medium ${bmiData.color}`}>{bmiData.category}</div>
                </div>
              </div>
            </div>

            <div className="interactive-card glass-card p-6" data-tutorial="progress">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{caloriesConsumed}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="text-xs text-green-500">of {calorieGoal} goal</div>
                </div>
                <ProgressRing progress={Math.min(calorieProgress, 100)} size={60} />
              </div>
            </div>

            <div className="interactive-card glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{caloriesBurned}</div>
                  <div className="text-sm text-muted-foreground">Burned</div>
                  <div className="text-xs text-orange-500">calories today</div>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="interactive-card glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{waterGlasses}</div>
                  <div className="text-sm text-muted-foreground">Water</div>
                  <div className="text-xs text-blue-500">glasses today</div>
                </div>
                <ProgressRing progress={Math.min(waterProgress, 100)} size={60} color="secondary" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Daily Quote */}
        <motion.section
          ref={statsAnimation.ref}
          className={`scroll-reveal ${statsAnimation.isVisible ? 'visible' : 'visible'}`}
          style={{ opacity: 1, visibility: 'visible' }}
        >
          <div className="glass-card p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <blockquote className="text-xl font-medium italic mb-4 gradient-text">
                "{dailyQuote.text}"
              </blockquote>
              <p className="text-sm text-muted-foreground">— {dailyQuote.author}</p>
            </motion.div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Meal Plans */}
          <motion.section 
            ref={mealAnimation.ref}
            className={`scroll-reveal-left ${mealAnimation.isVisible ? 'visible' : 'visible'}`}
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <Card className="glass-card border-0 h-full" data-tutorial="meals">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-500" />
                    </div>
                    <span>Today's Meals</span>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {progressData.completedMeals.length}/{allMeals.length} completed
                  </div>
                </div>
                <Progress value={(progressData.completedMeals.length / allMeals.length) * 100} className="progress-modern" />
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {allMeals.map((meal, index) => {
                    const isCompleted = progressData.completedMeals.includes(meal.id);
                    return (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          interactive-card glass-card p-4 transition-all duration-300
                          ${isCompleted ? 'bg-green-500/10 border-green-500/30' : ''}
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={(checked) => 
                              updateMealCalories(meal.id, meal.calories, checked as boolean)
                            }
                            className="hover-scale"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                  {meal.name}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{meal.type}</p>
                              </div>
                              <span className="text-sm font-medium text-primary">{meal.calories} cal</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{meal.quantity}</p>
                          </div>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-500"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.section>

          {/* Workout Plans */}
          <motion.section 
            ref={workoutAnimation.ref}
            className={`scroll-reveal-right ${workoutAnimation.isVisible ? 'visible' : 'visible'}`}
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <Card className="glass-card border-0 h-full" data-tutorial="workouts">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-blue-500" />
                    </div>
                    <span>{userProfile.workoutType} Workouts</span>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {progressData.completedWorkouts.length}/{workoutPlan.exercises.length} completed
                  </div>
                </div>
                <Progress value={(progressData.completedWorkouts.length / workoutPlan.exercises.length) * 100} className="progress-modern" />
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {workoutPlan.exercises.map((exercise, index) => {
                    const isCompleted = progressData.completedWorkouts.includes(exercise.id);
                    return (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          interactive-card glass-card p-4 transition-all duration-300
                          ${isCompleted ? 'bg-blue-500/10 border-blue-500/30' : ''}
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={(checked) => 
                              updateWorkoutCalories(exercise.id, exercise.calories, checked as boolean)
                            }
                            className="hover-scale"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                {exercise.name}
                              </h4>
                              <span className="text-sm font-medium text-blue-500">{exercise.calories} cal</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {exercise.sets} sets × {exercise.reps} reps
                            </p>
                          </div>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-blue-500"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}