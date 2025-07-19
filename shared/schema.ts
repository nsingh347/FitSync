import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User profile schema for local storage
export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  age: z.number().min(13).max(100),
  gender: z.enum(["male", "female", "other"]),
  height: z.number().min(100).max(250), // cm
  weight: z.number().min(30).max(300), // kg
  goal: z.enum(["weight-loss", "muscle-gain", "maintenance", "endurance"]),
  activityLevel: z.enum(["beginner", "intermediate", "advanced"]),
  workoutType: z.enum(["home", "gym", "yoga"]),
  createdAt: z.string(),
});

// Progress tracking schema
export const progressEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  weight: z.number().optional(),
  caloriesConsumed: z.number().default(0),
  caloriesBurned: z.number().default(0),
  waterGlasses: z.number().default(0),
  completedMeals: z.array(z.string()).default([]),
  completedWorkouts: z.array(z.string()).default([]),
});

// Meal plan item schema
export const mealItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fat: z.number().optional(),
  quantity: z.string(),
});

// Meal plan schema
export const mealPlanSchema = z.object({
  id: z.string(),
  goal: z.string(),
  activityLevel: z.string(),
  breakfast: z.array(mealItemSchema),
  lunch: z.array(mealItemSchema),
  dinner: z.array(mealItemSchema),
  snacks: z.array(mealItemSchema).optional(),
});

// Workout exercise schema
export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(), // minutes
  calories: z.number(),
  instructions: z.string().optional(),
});

// Workout plan schema
export const workoutPlanSchema = z.object({
  id: z.string(),
  goal: z.string(),
  activityLevel: z.string(),
  exercises: z.array(exerciseSchema),
  totalDuration: z.number(),
  totalCalories: z.number(),
});

// Blog post schema
export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  author: z.string(),
  readTime: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type ProgressEntry = z.infer<typeof progressEntrySchema>;
export type MealItem = z.infer<typeof mealItemSchema>;
export type MealPlan = z.infer<typeof mealPlanSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type WorkoutPlan = z.infer<typeof workoutPlanSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
