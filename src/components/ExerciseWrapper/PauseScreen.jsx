import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import adele from "./adele-skyfall.mp3";
import ReactSound from "react-sound";

export default props => {
  return (
    <div>
      src\components\ExerciseWrapper\adele-skyfall.mp3
      src\components\ExerciseWrapper\PauseScreen.jsx
      <ReactSound
        url={adele}
        volume={50}
        playStatus={ReactSound.status.PLAYING}
      />
      <div className="timer-div">
        <CountdownCircleTimer
          className="timer"
          durationSeconds={props.time}
          renderTime={time => {
            if (time <= 0) {
              props.endPause();
            }
            return (
              <div className="timer-description">
                <div className="time">{time}s</div>
                <h1>Pause...</h1>
              </div>
            );
          }}
          colors={[["#f00", 0.33], ["#ff0", 0.33], ["#0f0"]]}
          isPlaying={props.isRunning}
          size={500}
        />
      </div>
      <div className="pause-description relative-position">
        <div className="vertical-center">
          <div className="next-exercise">
            Next exercise:
            <h1 onClick={props.endPause}>
              <i className="ui angle double right icon"></i>
              {props.nextExercise}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
