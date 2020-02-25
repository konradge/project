export default (
  data = {
    languages: [],
    muscles: [],
    equipment: []
  },
  action
) => {
  switch (action.type) {
    case "LOAD_DEFAULT_DATA_FROM_WGER":
      return {
        ...data,
        languages: action.payload.language,
        equipment: action.payload.equipment,
        muscles: action.payload.muscle
      };
    default:
      return data;
  }
};
