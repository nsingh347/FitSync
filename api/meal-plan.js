export default function handler(req, res) {
  const { goal, activityLevel } = req.query;
  // Example static data (replace with your logic)
  if (goal === "weight-loss" && activityLevel === "beginner") {
    res.status(200).json({
      id: "weight-loss-beginner",
      goal: "weight-loss",
      activityLevel: "beginner",
      breakfast: [
        { id: "1", name: "Oats with banana and almonds", calories: 180, protein: 6, carbs: 30, fat: 4, quantity: "100g" },
        { id: "2", name: "Green tea with honey", calories: 25, protein: 0, carbs: 6, fat: 0, quantity: "1 cup" }
      ],
      lunch: [
        { id: "3", name: "Brown rice with dal", calories: 220, protein: 8, carbs: 45, fat: 2, quantity: "150g" },
        { id: "4", name: "Palak paneer", calories: 150, protein: 12, carbs: 8, fat: 10, quantity: "100g" },
        { id: "5", name: "Mixed vegetable salad", calories: 50, protein: 2, carbs: 10, fat: 1, quantity: "80g" }
      ],
      dinner: [
        { id: "6", name: "Roti with sabzi", calories: 120, protein: 4, carbs: 24, fat: 2, quantity: "2 pieces" },
        { id: "7", name: "Grilled chicken", calories: 117, protein: 22, carbs: 0, fat: 3, quantity: "75g" },
        { id: "8", name: "Cucumber raita", calories: 45, protein: 3, carbs: 6, fat: 1, quantity: "100g" }
      ]
    });
  } else {
    res.status(404).json({ message: "Meal plan not found" });
  }
} 