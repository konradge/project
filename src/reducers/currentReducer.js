export default (current = def, action) => {
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
    case "SET_PAUSE":
      return { ...current, pause: action.payload };
    default:
      return current;
  }
};

const def = {
  exercise: null,
  workout: null,
  index: 0,
  workoutStoppedAt: 0, //Zeit, an der die aktuelle Übung gerade ist (Falls Seite gewechselt wird)
  pause: undefined
};
