export const setExercise = exercise => {
  return {
    type: "SET_EXERCISE",
    payload: exercise
  };
};

export const selectExercise = (workout, index) => {
  return {
    type: "SELECT_EXERCISE",
    payload: { workout, index }
  };
};

export const createWorkout = (exercisePool, exerciseCount) => {
  console.log(exercisePool);
  return {
    type: "CREATE_WORKOUT",
    payload: { exercisePool, exerciseCount }
  };
};

export const selectWorkout = workout => {
  return {
    type: "SELECT_WORKOUT",
    payload: workout
  };
};
