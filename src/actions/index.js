import wger from "../apis/wger";
import Axios from "axios";

/**Current Reducer actions */
//Setze ID von aktuellen Workout (in currentReducer)
export const setWorkout = workoutId => {
  return {
    type: "SET_WORKOUT",
    payload: workoutId
  };
};

//Setzt den Index der gerade durchgeführten Übung im gerade durchgeführten Workout
export const setIndex = index => {
  return {
    type: "SET_INDEX",
    payload: index
  };
};

//Um nach einem Bearbeiten o.Ä. an der gleichen Stelle im Workout weiterzumachen, speichere die aktuelle Stelle
export const setStoppedAt = timeAlreadyPassed => {
  return {
    type: "SET_STOPPED_AT",
    payload: timeAlreadyPassed
  };
};

//Setzte die Pause in Sekunden; time = null -> Keine Pause
export const setPause = time => {
  return { type: "SET_PAUSE", payload: time };
};

/**userData reducer actions */

/**Muscle */
//Erstelle eine neue Muskulatur mit Namen <muscleName>
export const createMuscle = muscleName => {
  return { type: "CREATE_MUSCLE", payload: muscleName };
};

//Lösche eine Muskulatur mit ID <id>
export const deleteMuscle = id => {
  return { type: "DELETE_MUSCLE", payload: id };
};
/**Equipment */
//Erstelle eine neues Equipment mit Namen <equipmentName>
export const createEquipment = equipmentName => {
  return { type: "CREATE_EQUIPMENT", payload: equipmentName };
};

//Lösche ein Equipment mit ID <id>
export const deleteEquipment = id => {
  return { type: "DELETE_EQUIPMENT", payload: id };
};
/**Workout */
//Füge ein Workout mit dem Namen <workoutName> hinzu
export const addWorkout = workoutName => {
  return { type: "ADD_WORKOUT", payload: workoutName };
};

//Entferne ein Workout mit der ID <workoutId>
export const removeWorkout = workoutId => {
  return { type: "REMOVE_WORKOUT", payload: workoutId };
};

//Füge eine Übung zu einem Workout hinzu (Nur Übungs-ID wird gespeichert)
export const addExerciseToWorkout = (exerciseId, workoutId) => {
  return {
    type: "ADD_EXERCISE_TO_WORKOUT",
    payload: { exerciseId, workoutId }
  };
};

//Entferne eine Übung an der Stelle <position> im Workout mit der ID <workoutId> aus diesem Workout
export const removeExerciseFromWorkout = (position, workoutId) => {
  return {
    type: "REMOVE_EXERCISE_FROM_WORKOUT",
    payload: { position, workoutId }
  };
};

//Setze einzelne Felder in einem Workout (z. B. workout={exercises:[1,2,3]})
export const editWorkout = (workoutId, workout) => {
  return { type: "EDIT_WORKOUT", payload: { workoutId, workout } };
};

/**Exercise */
//Füge eine Übung mit dem Namen <exerciseName> zur userdata hinzu
export const addExercise = exerciseName => {
  return { type: "ADD_EXERCISE", payload: exerciseName };
};

//Entferne eine Übung mit ID <exerciseId> aus der userdata
export const removeExercise = exerciseId => {
  return { type: "REMOVE_EXERCISE", payload: exerciseId };
};

//Setze Übung mit ID id auf exercise(exakt)
export const editExercise = (exercise, id) => {
  return { type: "EDIT_EXERCISE", payload: { exercise, id } };
};

/** History */
//Füge den Titel eines beendeten Workouts zur History hinzu
export const pushWorkoutHistory = title => {
  return { type: "PUSH_WORKOUT_HISTORY", payload: title };
};

//Füge Zeit zur totalTrainingTime hinzu
export const addTime = timeToAdd => {
  return { type: "ADD_TIME", payload: timeToAdd };
};

//Füge ein neues Körpergewicht zur History der Gewichte hinzu
export const addWeight = newWeight => {
  return { type: "ADD_WEIGHT", payload: newWeight };
};
/**Bearbeitung aller Daten */
//Setze den Standardwert von <key> auf <value>
export const setDefaultValue = (value, key) => {
  return { type: "SET_DEFAULT_VALUE", payload: { key, value } };
};

//Lösche alle in <fieldsToDelete> angegebenen Felder
//z. B. {exercises:true, muscles:true} löscht Übungen und Muskelgruppen
export const deleteAll = fieldsToDelete => {
  return { type: "DELETE_ALL", payload: fieldsToDelete };
};

//Setze userData auf data (überschreibt andere Daten)
export const setUserData = data => {
  return { type: "SET_USER_DATA", payload: data };
};

//Füge data zu userData hinzu (wird angehängt)
export const addUserData = data => {
  return { type: "ADD_USER_DATA", payload: data };
};

export const setSearchSettings = searchSettings => {
  return { type: "SET_SEARCH_SETTINGS", payload: searchSettings };
};

export const setSearchPage = page => {
  return { type: "SET_SEARCH_PAGE", payload: page };
};

/** Load defaults */

//Lade Standarddaten aus json-Dateien und von wger.de
export const loadDefaultData = () => async dispatch => {
  let workouts, exercises, muscles;
  try {
    [workouts, exercises, muscles] = await Axios.all([
      Axios.get("/defaultData/workouts.json"),
      Axios.get("/defaultData/exercises.json"),
      Axios.get("/defaultData/muscles.json")
    ]);
  } catch {
    [workouts, exercises, muscles] = await Axios.all([
      Axios.get("/be-fit/defaultData/workouts.json"),
      Axios.get("/be-fit/defaultData/exercises.json"),
      Axios.get("/be-fit/defaultData/muscles.json")
    ]);
  }
  dispatch({
    type: "LOAD_DEFAULT_DATA_FROM_JSON",
    payload: {
      workouts: workouts.data,
      exercises: exercises.data,
      muscles: muscles.data
    }
  });
  const [language, muscle, equipment] = await Axios.all([
    wger.get("/language.json"),
    wger.get("/muscle.json"),
    wger.get("/equipment.json")
  ]);

  dispatch({
    type: "LOAD_DEFAULT_DATA_FROM_WGER",
    payload: {
      language: language.data.results,
      muscle: muscle.data.results,
      equipment: equipment.data.results
    }
  });
};
