//Setze ID von currentExercise(Mithilfe Übungsindex kann dann echte Übung geholt werden)
export const setExercise = exerciseId => {
  return {
    type: "SET_EXERCISE",
    payload: exerciseId
  };
};

//Erstelle zufälliges Workout aus exerciseCount Übungen (Array aus Inidzes)
//Dabei ist exercisePool ein Array aus möglichen Indizes
export const createRandomWorkout = (exercisePool, exerciseCount) => {
  return {
    type: "CREATE_RANDOM_WORKOUT",
    payload: { exercisePool, exerciseCount }
  };
};

//Setze ID von Workout
export const setWorkout = workoutId => {
  return {
    type: "SET_WORKOUT",
    payload: workoutId
  };
};

export const setIndex = index => {
  return {
    type: "SET_INDEX",
    payload: index
  };
};

export const addExerciseToWorkout = (exerciseId, workoutId) => {
  return {
    type: "ADD_EXERCISE_TO_WORKOUT",
    payload: { exerciseId, workoutId }
  };
};

export const removeExerciseFromWorkout = (exerciseId, workoutId) => {
  return {
    type: "REMOVE_EXERCISE_FROM_WORKOUT",
    payload: { exerciseId, workoutId }
  };
};

export const addExercise = exerciseName => {
  return { type: "ADD_EXERCISE", payload: exerciseName };
};

export const addWorkout = workoutName => {
  return { type: "ADD_WORKOUT", payload: workoutName };
};

//Setze Übung mit ID id auf exercise
export const editExercise = (exercise, id) => {
  return { type: "EDIT_EXERCISE", payload: { exercise, id } };
};

//Füge die ID eines beendeten Workouts zur History hinzu
export const pushWorkoutHistory = workout => {
  return { type: "PUSH_WORKOUT_HISTORY", payload: workout };
};

//Füge Zeit zur totalTrainingTime hinzu
export const addTime = timeToAdd => {
  return { type: "ADD_TIME", payload: timeToAdd };
};

//Füge ein neues Gewicht zur History der Gewichte hinzu
export const addWeight = newWeight => {
  return { type: "ADD_WEIGHT", payload: newWeight };
};
