import { getId } from "../helpers";

const defaultHistory = {
  lastWorkouts: [],
  totalTrainingTime: 0,
  weight: []
};
const defaultValues = { exerciseDuration: 10, pauseTime: 10 };

export default (
  userData = {
    workouts: [],
    exercises: [],
    muscles: [],
    equipment: [],
    shouldLoadDefaultData: true,
    history: defaultHistory,
    defaultValues
  },
  action
) => {
  //Muss hier initialisiert werden, damit Variablenname mehrfach verwendet werden kann
  let workout, history, workouts, exercises, muscles;
  switch (action.type) {
    /**Muscle */
    case "CREATE_MUSCLE":
      return {
        ...userData,
        muscles: [
          ...userData.muscles,
          { id: getId(userData.muscles), name: action.payload }
        ]
      };
    case "DELETE_MUSCLE":
      return {
        ...userData,
        muscles: userData.muscles.filter(muscle => muscle.id !== action.payload)
      };
    /**Equipment */
    case "CREATE_EQUIPMENT":
      return {
        ...userData,
        equipment: [
          ...userData.equipment,
          { id: getId(userData.equipment), name: action.payload }
        ]
      };
    case "DELETE_EQUIPMENT":
      return {
        ...userData,
        equipment: userData.muscles.filter(
          equipment => equipment.id !== action.payload
        )
      };
    /**Workout */
    case "ADD_WORKOUT":
      return {
        ...userData,
        workouts: [
          ...userData.workouts,
          {
            id: getId(userData.workouts),
            title: action.payload,
            exercises: [],
            pauseTime: userData.defaultValues.pauseTime
          }
        ]
      };
    case "REMOVE_WORKOUT":
      return {
        ...userData,
        workouts: userData.workouts.filter(
          workout => workout.id !== action.payload
        )
      };
    case "ADD_EXERCISE_TO_WORKOUT":
      workout = userData.workouts.find(w => w.id === action.payload.workoutId);
      if (!workout) {
        return userData;
      }
      workout = {
        ...workout,
        exercises: [...workout.exercises, { id: action.payload.exerciseId }]
      };
      return {
        ...userData,
        workouts: [
          ...userData.workouts.filter(w => w.id !== action.payload.workoutId),
          workout
        ]
      };
    case "REMOVE_EXERCISE_FROM_WORKOUT":
      workout = userData.workouts.find(w => w.id === action.payload.workoutId);
      workout.exercises.splice(action.payload.position, 1);
      return {
        ...userData,
        workouts: [
          ...userData.workouts.filter(w => w.id !== action.payload.workoutId),
          workout
        ]
      };
    case "EDIT_WORKOUT":
      workout = userData.workouts.find(w => w.id === action.payload.workoutId);
      workout = { ...workout, ...action.payload.workout };
      return {
        ...userData,
        workouts: [
          ...userData.workouts.filter(w => w.id !== action.payload.workoutId),
          workout
        ]
      };
    /**Exercise */
    case "ADD_EXERCISE":
      const id = getId(userData.exercises);
      return {
        ...userData,
        exercises: [
          ...userData.exercises,
          {
            id,
            name: action.payload || "Unnamed exercise " + id,
            duration: userData.defaultValues.exerciseDuration
          }
        ]
      };
    case "REMOVE_EXERCISE":
      const updatedWorkouts = userData.workouts.map(workout => {
        return {
          ...workout,
          deleted: true,
          exercises: workout.exercises.filter(
            exercise => exercise !== action.payload
          )
        };
      });
      return {
        ...userData,
        exercises: userData.exercises.filter(e => e.id !== action.payload),
        workouts: updatedWorkouts
      };
    case "EDIT_EXERCISE":
      //Die Übung mit der ID action.payload.id wird entfernt und die bearbeitete dann wieder hinzugefügt
      return {
        ...userData,
        exercises: [
          ...userData.exercises.filter(ex => ex.id !== action.payload.id),
          { ...action.payload.exercise, id: action.payload.id }
        ]
      };
    /** History */
    case "PUSH_WORKOUT_HISTORY":
      return {
        ...userData,
        history: {
          ...userData.history,
          lastWorkouts: [
            ...userData.history.lastWorkouts,
            { date: new Date(), title: action.payload }
          ]
        }
      };
    case "ADD_TIME":
      return {
        ...userData,
        history: {
          ...userData.history,
          totalTrainingTime: userData.history.totalTrainingTime + action.payload
        }
      };
    case "ADD_WEIGHT":
      return {
        ...userData,
        history: {
          ...userData.history,
          weight: [
            ...userData.history.weight,
            { date: new Date(), weight: action.payload }
          ]
        }
      };
    /**Bearbeitung aller Daten */
    case "SET_DEFAULT_VALUE":
      try {
        defaultValues[action.payload.key] = parseInt(action.payload.value);
      } catch {
        defaultValues[action.payload.key] = action.payload.value;
      }
      return {
        ...userData,
        defaultValues
      };
    case "DELETE_ALL":
      //Lösche die in action.payload angegebenen Felder aus userData
      if (action.payload.workouts) {
        workouts = [];
      } else if (action.payload.exercises) {
        //Wenn Übungen gelöscht werden: Lösche sie auch aus den Workouts
        workouts = userData.workouts.map(workout => {
          return {
            ...workout,
            exercises: []
          };
        });
      } else {
        workouts = userData.workouts;
      }
      if (action.payload.exercises) {
        exercises = [];
      } else if (action.payload.muscles || action.payload.equipment) {
        if (action.payload.muscles) {
          //Falls Muskeln gelöscht werden: Lösche diese auch in den Übungen
          //Behalte dabei die "Standardmuskeln" aus der Wger Datenbank
          exercises = userData.exercises.map(exercise => {
            return {
              ...exercise,
              muscles: exercise.muscles.filter(muscle => muscle <= 15)
            };
          });
        }
        if (action.payload.equipment) {
          //Gleiches für Equipment
          exercises = userData.exercises.map(exercise => {
            return {
              ...exercise,
              equipment: exercise.muscles.filter(equipment => equipment <= 10)
            };
          });
        }
      } else {
        exercises = userData.exercises;
      }

      //Behalte immer die "Standardmuskeln" aus der Wger Datenbank
      muscles = action.payload.muscles
        ? userData.muscles.filter(muscle => muscle.id <= 15)
        : userData.muscles;
      //Behalte immer das "Standardequipment" aus der Wger Datenbank
      let equipment = action.payload.equipment
        ? userData.equipment.filter(equipment => equipment.id <= 10)
        : userData.equipment;
      //History des Trainings; muss einzeln geleert werden
      history = userData.history;
      if (action.payload.history.weight) {
        history.weight = [];
      }
      if (action.payload.history["training time"]) {
        history.totalTrainingTime = 0;
      }
      if (action.payload.history.workouts) {
        history.lastWorkouts = [];
      }
      return {
        history,
        exercises,
        workouts,
        muscles,
        equipment,
        defaultValues
      };
    case "SET_USER_DATA":
      //Setze Daten aus action.payload als UserData
      return action.payload;
    case "ADD_USER_DATA":
      //Füge jeweilige Daten aus action.payload zu UserData hinzu
      ({ exercises, workouts, history } = action.payload);
      //Übungen laden (IDs weiter vergeben)
      let startId = getId(userData.exercises);
      for (let prop in exercises) {
        exercises[prop].id = startId;
        startId++;
      }
      //Workouts laden (IDs weiter vergeben)
      startId = getId(userData.workouts);
      for (let prop in workouts) {
        workouts[prop].id = startId;
        startId++;
      }
      //Muskeln laden (IDs weiter vergeben)
      startId = getId(userData.muscles);
      for (let prop in muscles) {
        muscles[prop].id = startId;
        startId++;
      }
      return {
        ...userData,
        exercises: [...userData.exercises, ...exercises],
        workouts: [...userData.workouts, ...workouts],
        muscles: [...userData.muscles, ...muscles],
        //Werte an history anhängen
        history: {
          lastWorkouts: [
            ...userData.history.lastWorkouts,
            ...history.lastWorkouts
          ],
          totalTrainingTime:
            userData.history.totalTrainingTime + history.totalTrainingTime,
          weight: [...userData.history.weight, ...history.weight]
        }
      };
    case "LOAD_DEFAULT_DATA_FROM_JSON":
      return {
        ...userData,
        workouts: action.payload.workouts,
        exercises: action.payload.exercises,
        muscles: action.payload.muscles
      };
    case "LOAD_DEFAULT_DATA_FROM_WGER":
      return {
        ...userData,
        muscles: [...userData.muscles, ...action.payload.muscle],
        equipment: [...userData.equipment, ...action.payload.equipment]
      };
    default:
      return userData;
  }
};
