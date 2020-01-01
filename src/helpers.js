export const formatTime = seconds => {
  let hours = Math.floor(seconds / (60 * 60));
  let mins = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);
  return (
    (hours === 0 ? "" : hours + ":") +
    (mins < 10 ? "0" + mins : mins) +
    ":" +
    (secs < 10 ? "0" + secs : secs)
  );
};

//For copy call shuffle([...array])
export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function findById(array, id) {
  return array.find(elem => elem.id === id);
}

//Calculates an array, which has max length of maxLength
export function sliceArray(arr, maxLength) {
  return arr.slice(
    Math.sign(arr.length - maxLength) === -1 ? 0 : arr.length - maxLength
  );
}

export function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
}

export function getWorkout(id, workoutList) {
  return workoutList.find(workout => workout.id === id);
}

export function getExercise(id, exerciseList) {
  return exerciseList.find(exercise => exercise.id === id);
}
