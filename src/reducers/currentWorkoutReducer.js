import { shuffle } from "../helpers";

export default (currentWorkout = { title: null, exercises: [] }, action) => {
  switch (action.type) {
    case "CREATE_RANDOM_WORKOUT":
      //Nehme aus dem gemischten exercisePool eine Anzahl an Übungen
      return {
        title: "Random workout",
        exercises: shuffle([...action.payload.exercisePool]).slice(
          0,
          action.payload.exerciseCount
        )
      };
    case "SELECT_WORKOUT":
      return action.payload;
    case "ADD_EXERCISE":
      let newWorkout = { ...currentWorkout };
      newWorkout.exercises.push(action.payload);

      return newWorkout;
    default:
      return currentWorkout;
  }
};
