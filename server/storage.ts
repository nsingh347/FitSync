import type { MealPlan, WorkoutPlan, BlogPost } from "@shared/schema";

export interface IStorage {
  getMealPlan(goal: string, activityLevel: string): Promise<MealPlan | undefined>;
  getWorkoutPlan(goal: string, activityLevel: string): Promise<WorkoutPlan | undefined>;
  getBlogPosts(): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private mealPlans: Map<string, MealPlan>;
  private workoutPlans: Map<string, WorkoutPlan>;
  private blogPosts: BlogPost[];

  constructor() {
    this.mealPlans = new Map();
    this.workoutPlans = new Map();
    this.blogPosts = [];
    this.initializeData();
  }

  private async initializeData() {
    // Initialize with sample data
    const sampleMealPlan: MealPlan = {
      id: "weight-loss-beginner",
      goal: "weight-loss",
      activityLevel: "beginner",
      breakfast: [
        { id: "1", name: "Oats with banana and almonds", calories: 180, protein: 6, carbs: 30, fat: 4, quantity: "100g" },
        { id: "2", name: "Green tea with honey", calories: 25, protein: 0, carbs: 6, fat: 0, quantity: "1 cup" },
      ],
      lunch: [
        { id: "3", name: "Brown rice with dal", calories: 220, protein: 8, carbs: 45, fat: 2, quantity: "150g" },
        { id: "4", name: "Palak paneer", calories: 150, protein: 12, carbs: 8, fat: 10, quantity: "100g" },
        { id: "5", name: "Mixed vegetable salad", calories: 50, protein: 2, carbs: 10, fat: 1, quantity: "80g" },
      ],
      dinner: [
        { id: "6", name: "Roti with sabzi", calories: 120, protein: 4, carbs: 24, fat: 2, quantity: "2 pieces" },
        { id: "7", name: "Grilled chicken", calories: 117, protein: 22, carbs: 0, fat: 3, quantity: "75g" },
        { id: "8", name: "Cucumber raita", calories: 45, protein: 3, carbs: 6, fat: 1, quantity: "100g" },
      ],
    };

    this.mealPlans.set("weight-loss-beginner", sampleMealPlan);

    const sampleBlogPost: BlogPost = {
      id: "1",
      title: "5 Indian Superfoods for Weight Loss",
      excerpt: "Discover traditional Indian ingredients that can accelerate your weight loss journey naturally.",
      category: "Nutrition",
      author: "Dr. Priya Sharma",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      createdAt: new Date().toISOString(),
    };

    this.blogPosts.push(sampleBlogPost);
  }

  async getMealPlan(goal: string, activityLevel: string): Promise<MealPlan | undefined> {
    const key = `${goal}-${activityLevel}`;
    return this.mealPlans.get(key);
  }

  async getWorkoutPlan(goal: string, activityLevel: string): Promise<WorkoutPlan | undefined> {
    const key = `${goal}-${activityLevel}`;
    return this.workoutPlans.get(key);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts;
  }
}

export const storage = new MemStorage();
