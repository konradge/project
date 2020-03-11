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
    case "SET_SEARCH_SETTINGS":
      //Set settings, reset page
      return { ...current, searchSettings: { ...action.payload, page: 1 } };
    case "SET_SEARCH_PAGE":
      return {
        //Copy settings, set page
        ...current,
        searchSettings: { ...current.searchSettings, page: action.payload }
      };
    default:
      return current;
  }
};

const def = {
  exercise: null,
  workout: null,
  index: 0,
  workoutStoppedAt: 0, //Zeit, an der die aktuelle Übung gerade ist (Falls Seite gewechselt wird)
  pause: undefined,
  searchSettings: { status: 2, page: 1 }
};
