export default (
  current = {
    exercise: null,
    workout: 1,
    index: 0,
    workoutStoppedAt: 0 //Zeit, an der die aktuelle Übung gerade ist (Falls Seite gewechselt wird)
  },
  action
) => {
  switch (action.type) {
    case "SET_EXERCISE":
      return { ...current, exercise: action.payload, workoutStoppedAt: 0 };
    case "SET_WORKOUT":
      return { ...current, workout: action.payload, workoutStoppedAt: 0 };
    case "SET_INDEX":
      return {
        ...current,
        index: action.payload,
        workoutStoppedAt: 0
      };
    case "SET_STOPPED_AT":
      return { ...current, workoutStoppedAt: action.payload };
    default:
      return current;
  }
};
