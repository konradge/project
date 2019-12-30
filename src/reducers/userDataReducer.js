import StateManager from "react-select";

const exercises = [
  { id: 0, name: "Pushup", duration: 3 },
  { id: 1, name: "Situps", duration: 4 },
  { id: 2, name: "Squats", duration: 6 },
  { id: 3, name: "Bent-Over Row", duration: 4 },
  { id: 4, name: "Abdominal Crunches", duration: 5 }
];

const workouts = [
  {
    id: 1,
    title: "First Workout",
    exercises: [exercises[0], exercises[1]]
  },
  {
    id: 2,
    title: "Second Workout",
    exercises: [exercises[2], exercises[3]]
  }
];

const history = {
  lastWorkouts: [
    { title: "EXAMPLE1Workout", date: new Date(2018, 11, 29) },
    { title: "EXAMPLE2Workout", date: new Date(2019, 5, 25) }
  ],
  totalTrainingTime: 20,
  weight: [
    { date: new Date(2019, 11, 29), weight: 70 },
    { date: new Date(2019, 11, 30), weight: 71 },
    { date: new Date(2019, 11, 31), weight: 70.7 },
    { date: new Date(2020, 0, 1), weight: 71.2 }
  ]
};

export default (
  userData = {
    workouts,
    exercises,
    history
  },
  action
) => {
  switch (action.type) {
    case "PUSH_WORKOUT_HISTORY":
      return {
        ...userData,
        history: {
          ...userData.history,
          lastWorkouts: [
            ...userData.history.lastWorkouts,
            { date: new Date(), title: action.payload.title }
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
    case "SET_USERDATA":
      return userData;
    case "ADD_WORKOUT":
      return userData;
    case "CHANGE_WORKOUT":
      return userData;
    case "GET_WORKOUT":
      return userData;
    default:
      return userData;
  }
};
