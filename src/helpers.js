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
