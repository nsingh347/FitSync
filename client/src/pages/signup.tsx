import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dumbbell, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userProfileSchema, type UserProfile } from "@shared/schema";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { OnboardingGuide } from "@/components/ui/onboarding-guide";
import { FloatingParticles } from "@/components/ui/floating-particles";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>("fitSyncProfile", null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const { toast } = useToast();

  const form = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      id: "",
      name: "",
      age: 25,
      gender: "male",
      height: 170,
      weight: 70,
      goal: "weight-loss",
      activityLevel: "beginner",
      workoutType: "home",
      createdAt: "",
    },
  });

  const onSubmit = (data: UserProfile) => {
    try {
      const profile: UserProfile = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setUserProfile(profile);
      setNewUserName(data.name);
      
      toast({
        title: "Profile Created!",
        description: "Welcome to FitSync. Let's start your fitness journey!",
      });

      // Show onboarding guide first, then navigate to dashboard
      setShowOnboarding(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setLocation("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {/* Background effects */}
        <FloatingParticles count={50} className="fixed inset-0 z-0" />
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="flex items-center justify-center space-x-2 mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
                <Dumbbell className="relative h-8 w-8 text-primary" />
              </div>
              <span className="text-3xl font-bold gradient-text">FitSync</span>
            </motion.div>
            <h2 className="text-3xl font-bold">Create Your Profile</h2>
            <p className="text-muted-foreground mt-2">Tell us about yourself to get personalized recommendations</p>
          </div>

          <Card className="glass-card border-0 shadow-2xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="13" 
                            max="100" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="100" 
                            max="250" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="30" 
                            max="300" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weight-loss">Weight Loss</SelectItem>
                          <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="endurance">Build Endurance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (Little to no exercise)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                          <SelectItem value="advanced">Advanced (Regular exerciser)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workoutType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Workout Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select workout type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="home">Home Workout (No equipment needed)</SelectItem>
                          <SelectItem value="gym">Gym Workout (With equipment)</SelectItem>
                          <SelectItem value="yoga">Yoga & Mindfulness</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="btn-primary w-full" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create My Profile
                </Button>

                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full glass-button" 
                  onClick={() => setLocation("/")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    {/* Onboarding Guide */}
    <OnboardingGuide
      isVisible={showOnboarding}
      onComplete={handleOnboardingComplete}
      userName={newUserName}
    />
  </>
  );
}
