import type { WorkoutPlan, Exercise } from "@shared/schema";

export const generateWorkoutPlan = (goal: string, activityLevel: string, workoutType: string = "home"): WorkoutPlan => {
  const exercises = getExercisesForGoalAndType(goal, activityLevel, workoutType);
  const totalDuration = exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0);
  const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);

  return {
    id: `${goal}-${activityLevel}-${workoutType}`,
    goal,
    activityLevel,
    exercises,
    totalDuration,
    totalCalories,
  };
};

const workoutLibrary = {
  home: {
    strength: [
      { id: "h_s1", name: "Push-ups", sets: 3, reps: 12, calories: 80, instructions: "Keep your body straight, lower chest to floor" },
      { id: "h_s2", name: "Bodyweight Squats", sets: 3, reps: 15, calories: 120, instructions: "Feet shoulder-width apart, lower until thighs parallel" },
      { id: "h_s3", name: "Plank", duration: 1, calories: 60, instructions: "Hold for 30-60 seconds, keep body straight" },
      { id: "h_s4", name: "Lunges", sets: 3, reps: 10, calories: 100, instructions: "Step forward, lower back knee to ground" },
      { id: "h_s5", name: "Mountain Climbers", sets: 3, reps: 20, calories: 140, instructions: "Alternate bringing knees to chest rapidly" },
      { id: "h_s6", name: "Burpees", sets: 3, reps: 8, calories: 160, instructions: "Squat, jump back to plank, push-up, jump up" },
    ],
    cardio: [
      { id: "h_c1", name: "Jumping Jacks", sets: 3, reps: 30, calories: 90, instructions: "Jump feet apart while raising arms overhead" },
      { id: "h_c2", name: "High Knees", duration: 2, calories: 100, instructions: "Run in place, bring knees to chest height" },
      { id: "h_c3", name: "Dance Workout", duration: 15, calories: 150, instructions: "Follow online dance routine for 15 minutes" },
      { id: "h_c4", name: "Stair Climbing", duration: 10, calories: 120, instructions: "Walk/run up and down stairs for 10 minutes" },
    ],
  },
  gym: {
    strength: [
      { id: "g_s1", name: "Bench Press", sets: 3, reps: 10, calories: 120, instructions: "Lower bar to chest, press up explosively" },
      { id: "g_s2", name: "Deadlifts", sets: 3, reps: 8, calories: 150, instructions: "Keep back straight, lift with legs and hips" },
      { id: "g_s3", name: "Barbell Squats", sets: 3, reps: 12, calories: 140, instructions: "Bar on upper back, squat to parallel" },
      { id: "g_s4", name: "Pull-ups/Lat Pulldown", sets: 3, reps: 8, calories: 100, instructions: "Pull body/weight to chest level" },
      { id: "g_s5", name: "Dumbbell Rows", sets: 3, reps: 12, calories: 110, instructions: "Pull weight to hip, squeeze shoulder blades" },
      { id: "g_s6", name: "Shoulder Press", sets: 3, reps: 10, calories: 90, instructions: "Press weights overhead, control the descent" },
    ],
    cardio: [
      { id: "g_c1", name: "Treadmill Running", duration: 20, calories: 200, instructions: "Maintain steady pace, 6-8 mph" },
      { id: "g_c2", name: "Rowing Machine", duration: 15, calories: 180, instructions: "Use legs primarily, lean back slightly" },
      { id: "g_c3", name: "Stationary Bike", duration: 25, calories: 160, instructions: "Moderate intensity, adjust resistance" },
      { id: "g_c4", name: "Elliptical", duration: 20, calories: 170, instructions: "Use arms and legs, maintain upright posture" },
    ],
  },
  yoga: {
    strength: [
      { id: "y_s1", name: "Warrior II", duration: 2, calories: 40, instructions: "Hold for 30 seconds each side, strong leg foundation" },
      { id: "y_s2", name: "Plank to Chaturanga", sets: 5, reps: 1, calories: 60, instructions: "Lower from plank to low push-up position" },
      { id: "y_s3", name: "Chair Pose", duration: 1, calories: 50, instructions: "Sit back as if in chair, arms up, hold 30-60 seconds" },
      { id: "y_s4", name: "Tree Pose", duration: 2, calories: 30, instructions: "Balance on one foot, other foot on inner thigh" },
      { id: "y_s5", name: "Bridge Pose", sets: 3, reps: 8, calories: 70, instructions: "Lift hips up, squeeze glutes, hold briefly" },
    ],
    cardio: [
      { id: "y_c1", name: "Sun Salutation A", sets: 5, reps: 1, calories: 80, instructions: "Flow through 8 poses smoothly" },
      { id: "y_c2", name: "Sun Salutation B", sets: 3, reps: 1, calories: 90, instructions: "More challenging flow with Warrior I" },
      { id: "y_c3", name: "Vinyasa Flow", duration: 20, calories: 140, instructions: "Continuous movement linking breath and poses" },
      { id: "y_c4", name: "Power Yoga", duration: 15, calories: 120, instructions: "Dynamic poses held for strength building" },
    ],
  },
};

function getExercisesForGoalAndType(goal: string, activityLevel: string, workoutType: string): Exercise[] {
  const workoutData = workoutLibrary[workoutType as keyof typeof workoutLibrary];
  let exercises: Exercise[] = [];
  
  switch (goal) {
    case "weight-loss":
      exercises = [...workoutData.cardio.slice(0, 2), ...workoutData.strength.slice(0, 2)];
      break;
    case "muscle-gain":
      exercises = [...workoutData.strength.slice(0, 3), workoutData.cardio[0]];
      break;
    case "maintenance":
      exercises = [...workoutData.strength.slice(0, 2), ...workoutData.cardio.slice(0, 1)];
      break;
    case "endurance":
      exercises = [...workoutData.cardio.slice(0, 3), workoutData.strength[0]];
      break;
    default:
      exercises = [...workoutData.strength.slice(0, 2), workoutData.cardio[0]];
  }

  // Adjust intensity based on activity level
  return exercises.map(exercise => {
    const multiplier = getIntensityMultiplier(activityLevel);
    return {
      ...exercise,
      sets: exercise.sets ? Math.round(exercise.sets * multiplier) : undefined,
      reps: exercise.reps ? Math.round(exercise.reps * multiplier) : undefined,
      duration: exercise.duration ? Math.round(exercise.duration * multiplier) : undefined,
      calories: Math.round(exercise.calories * multiplier),
    };
  });
}

function getIntensityMultiplier(activityLevel: string): number {
  switch (activityLevel) {
    case "beginner":
      return 0.8;
    case "intermediate":
      return 1.0;
    case "advanced":
      return 1.3;
    default:
      return 1.0;
  }
}
