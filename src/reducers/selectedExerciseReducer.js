export default (currentExercise = null, action) => {
  switch (action.type) {
    case "SET_EXERCISE":
      return action.payload;
    case "SELECT_EXERCISE":
      console.log(action.payload);
      if (!action.payload.workout || action.payload.workout.length === 0) {
        return currentExercise;
      }
      let index = action.payload.index % action.payload.workout.length;
      return {
        name: action.payload.workout[index].name,
        duration: action.payload.workout[index].duration,
        index: action.payload.index
      };
    default:
      return currentExercise;
  }
};
