export const loadState = () => {
  try {
    const serializedState = JSON.parse(localStorage.getItem("state"));
    if (serializedState === null) {
      return undefined;
    }
    console.log("Getting from localstorage...");
    console.log(JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", JSON.stringify(serializedState));
  } catch {
    // ignore write errors
  }
};
