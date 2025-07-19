import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get meal plan based on goal and activity level
  app.get("/api/meal-plan/:goal/:activityLevel", async (req, res) => {
    try {
      const { goal, activityLevel } = req.params;
      const mealPlan = await storage.getMealPlan(goal, activityLevel);
      
      if (!mealPlan) {
        return res.status(404).json({ message: "Meal plan not found" });
      }
      
      res.json(mealPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meal plan" });
    }
  });

  // Get workout plan based on goal and activity level
  app.get("/api/workout-plan/:goal/:activityLevel", async (req, res) => {
    try {
      const { goal, activityLevel } = req.params;
      const workoutPlan = await storage.getWorkoutPlan(goal, activityLevel);
      
      if (!workoutPlan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      
      res.json(workoutPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workout plan" });
    }
  });

  // Get blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
