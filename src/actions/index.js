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

export const createRandomWorkout = (exercisePool, exerciseCount) => {
  return {
    type: "CREATE_RANDOM_WORKOUT",
    payload: { exercisePool, exerciseCount }
  };
};

export const selectWorkout = workout => {
  return {
    type: "SELECT_WORKOUT",
    payload: workout
  };
};

export const addExercise = exercise => {
  return { type: "ADD_EXERCISE", payload: exercise };
};

export const pushWorkoutHistory = workout => {
  return { type: "PUSH_WORKOUT_HISTORY", payload: workout };
};

export const addTime = timeToAdd => {
  return { type: "ADD_TIME", payload: timeToAdd };
};

export const addWeight = newWeight => {
  return { type: "ADD_WEIGHT", payload: newWeight };
};
