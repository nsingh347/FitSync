import type { MealPlan, MealItem, UserProfile } from "@shared/schema";

// Main export function that accepts UserProfile
export const generateMealPlan = (userProfile: UserProfile): MealPlan => {
  return generateMealPlanInternal(userProfile.goal, userProfile.activityLevel);
};

// Internal function with old signature for backward compatibility
const generateMealPlanInternal = (goal: string, activityLevel: string): MealPlan => {
  const baseMeals = {
    breakfast: [
      { id: "b1", name: "Oats with banana and almonds", calories: 180, protein: 6, carbs: 30, fat: 4, quantity: "100g" },
      { id: "b2", name: "Green tea with honey", calories: 25, protein: 0, carbs: 6, fat: 0, quantity: "1 cup" },
      { id: "b3", name: "Mixed nuts", calories: 80, protein: 3, carbs: 3, fat: 7, quantity: "20g" },
    ],
    lunch: [
      { id: "l1", name: "Brown rice with dal", calories: 220, protein: 8, carbs: 45, fat: 2, quantity: "150g" },
      { id: "l2", name: "Palak paneer", calories: 150, protein: 12, carbs: 8, fat: 10, quantity: "100g" },
      { id: "l3", name: "Mixed vegetable salad", calories: 50, protein: 2, carbs: 10, fat: 1, quantity: "80g" },
    ],
    dinner: [
      { id: "d1", name: "Roti with sabzi", calories: 120, protein: 4, carbs: 24, fat: 2, quantity: "2 pieces" },
      { id: "d2", name: "Grilled chicken", calories: 117, protein: 22, carbs: 0, fat: 3, quantity: "75g" },
      { id: "d3", name: "Cucumber raita", calories: 45, protein: 3, carbs: 6, fat: 1, quantity: "100g" },
    ],
  };

  // Adjust portions based on goal and activity level
  const multiplier = getCalorieMultiplier(goal, activityLevel);
  
  const adjustedMeals = {
    breakfast: baseMeals.breakfast.map(item => ({
      ...item,
      calories: Math.round(item.calories * multiplier),
    })),
    lunch: baseMeals.lunch.map(item => ({
      ...item,
      calories: Math.round(item.calories * multiplier),
    })),
    dinner: baseMeals.dinner.map(item => ({
      ...item,
      calories: Math.round(item.calories * multiplier),
    })),
  };

  return {
    id: `${goal}-${activityLevel}`,
    goal,
    activityLevel,
    ...adjustedMeals,
  };
};

function getCalorieMultiplier(goal: string, activityLevel: string): number {
  let baseMultiplier = 1.0;
  
  // Adjust based on goal
  switch (goal) {
    case "weight-loss":
      baseMultiplier = 0.8;
      break;
    case "muscle-gain":
      baseMultiplier = 1.3;
      break;
    case "maintenance":
      baseMultiplier = 1.0;
      break;
    case "endurance":
      baseMultiplier = 1.2;
      break;
  }
  
  // Adjust based on activity level
  switch (activityLevel) {
    case "beginner":
      baseMultiplier *= 0.9;
      break;
    case "intermediate":
      baseMultiplier *= 1.0;
      break;
    case "advanced":
      baseMultiplier *= 1.2;
      break;
  }
  
  return baseMultiplier;
}
