export default (
  current = { exercise: null, workout: null, index: 0 },
  action
) => {
  switch (action.type) {
    case "SET_EXERCISE":
      return { ...current, exercise: action.payload };
    case "SET_WORKOUT":
      console.log("SET_WORKOUT" + action.payload);
      return { ...current, workout: action.payload };
    case "SET_INDEX":
      return { ...current, index: action.payload };
    default:
      return current;
  }
};
