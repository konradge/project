import React from "react";
import { useSelector } from "react-redux";
import Exercise from "../Exercise";
import PauseScreen from "./PauseScreen";

export default function ExerciseScreen(props) {
  return (
    <div>
      <div className="title">
        <div className="heading bottom">{props.workoutTitle}</div>
      </div>
      {props.pause ? (
        <PauseScreen
          time={props.pause}
          isRunning={props.isRunning}
          endPause={props.next}
          nextExercise={props.nextExercise.name}
        />
      ) : (
        <Exercise
          exercise={props.exercise}
          running={props.isRunning}
          startAt={props.exerciseStoppedTime}
          next={props.next}
          edit={() => props.history.push("/exercise/" + props.exercise.id)}
        />
      )}
      <div className="exercise-menu">
        <div className="ui grid">
          <div className="three wide column">
            <i className="step backward icon" onClick={props.previous}></i>
          </div>
          <div className="three wide column">
            {props.isRunning ? (
              <i className="pause icon" onClick={props.pauseTimer}></i>
            ) : (
              <i className="play icon" onClick={props.runTimer}></i>
            )}
          </div>
          <div className="three wide column">
            <i className="step forward icon" onClick={props.next}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
