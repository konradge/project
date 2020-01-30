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

//Um nach einem Bearbeiten o.Ä. an der gleichen Stelle im Workout weiterzumachen, speichere die aktuelle Stelle
export const setStoppedAt = timeInExercise => {
  return {
    type: "SET_STOPPED_AT",
    payload: timeInExercise
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

export const removeExerciseFromWorkout = (position, workoutId) => {
  return {
    type: "REMOVE_EXERCISE_FROM_WORKOUT",
    payload: { position, workoutId }
  };
};

export const editWorkout = (workoutId, workout) => {
  return { type: "EDIT_WORKOUT", payload: { workoutId, workout } };
};

export const addExercise = exerciseName => {
  return { type: "ADD_EXERCISE", payload: exerciseName };
};

export const removeExercise = exerciseId => {
  return { type: "REMOVE_EXERCISE", payload: exerciseId };
};

export const addWorkout = workoutName => {
  return { type: "ADD_WORKOUT", payload: workoutName };
};

export const removeWorkout = workoutId => {
  return { type: "REMOVE_WORKOUT", payload: workoutId };
};

//Setze Übung mit ID id auf exercise
export const editExercise = (exercise, id) => {
  console.log(exercise);
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
