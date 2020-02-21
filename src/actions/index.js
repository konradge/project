import wger from "../apis/wger";
import Speech from "speak-tts";

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
  return { type: "EDIT_EXERCISE", payload: { exercise, id } };
};

//Füge die ID eines beendeten Workouts zur History hinzu
export const pushWorkoutHistory = (workout, title) => {
  return { type: "PUSH_WORKOUT_HISTORY", payload: { workout, title } };
};

//Füge Zeit zur totalTrainingTime hinzu
export const addTime = timeToAdd => {
  return { type: "ADD_TIME", payload: timeToAdd };
};

//Füge ein neues Gewicht zur History der Gewichte hinzu
export const addWeight = newWeight => {
  return { type: "ADD_WEIGHT", payload: newWeight };
};

export const deleteAll = fieldsToDelete => {
  return { type: "DELETE_ALL", payload: fieldsToDelete };
};

export const setDefaultValue = (value, key) => {
  return { type: "SET_DEFAULT_VALUE", payload: { key, value } };
};

export const setPause = time => {
  return { type: "SET_PAUSE", payload: time };
};

export const createMuscle = muscleName => {
  return { type: "CREATE_MUSCLE", payload: muscleName };
};

/*
  Importiere Daten
*/
export const setUserData = data => {
  return { type: "SET_USER_DATA", payload: data };
};

export const addUserData = data => {
  return { type: "ADD_USER_DATA", payload: data };
};

/** Wger actions */

export const getLanguages = () => async dispatch => {
  const response = await wger.get("/language.json");
  dispatch({ type: "GET_LANGUAGES", payload: response.data.results });
};

export const getMuscles = () => async dispatch => {
  const response = await wger.get("/muscle.json");
  console.log(getMuscles);
  dispatch({ type: "GET_MUSCLES", payload: response.data.results });
};

export const getEquipment = () => async dispatch => {
  const response = await wger.get("/equipment.json");

  dispatch({ type: "GET_EQUIPMENT", payload: response.data.results });
};
