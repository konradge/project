export default (results = def, action) => {
  switch (action.type) {
    case "GET_LANGUAGES":
      return { ...results, languages: action.payload };
    case "GET_EQUIPMENT":
      return { ...results, equipment: action.payload };
    default:
      return results;
  }
};

const def = {
  languages: [],
  muscles: [],
  equipment: []
};
