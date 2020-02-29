/*
  Zeige die Verbleibende Zeit einer Übung zusammen mit einigen Informationen an
*/
import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Speech from "speak-tts";

import { addTime, setStoppedAt } from "../../actions";
import { connect } from "react-redux";

class Exercise extends Component {
  state = { key: 0, lastTime: 0, speech: null };
  async componentDidMount() {
    const speech = new Speech();
    await speech.init({ lang: "en-GB" });

    this.setState({ speech });
  }
  renderTime(time) {
    //Funktion wird 60 Mal in der Sekunde aufgerufen
    //Füge jedes mal 1/60 Sekunde zur Trainingszeit hinzu
    if (this.state.lastTime !== time) {
      if (this.state.speech) {
        if (time > 0 && time < 4) {
          this.state.speech.speak({
            text: "" + time,
            queue: false
          });
        }
      }
      //Eine Sekunde ist vergangen
      this.props.addTime(1 / 60);
      this.props.setStoppedAt(this.props.exercise.duration - time);

      this.setState({ lastTime: time });
    }

    //Update die Übungszeit im redux-store

    if (time === 0) {
      //Zwinge den Timer, die Zeit neuzustarten
      this.setState({ key: this.state.key + 1 });
      //Starte die nächste Übung
      this.props.next();
    }
    return (
      <div className="timer-description">
        <div className="time">{time}s</div>
        <h1>{this.props.exercise.name}</h1>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="timer-div">
          <CountdownCircleTimer
            className="timer"
            key={"" + this.props.exercise.id + this.state.key}
            durationSeconds={this.props.exercise.duration}
            colors={[["#f00", 0.33], ["#ff0", 0.33], ["#0f0"]]}
            isPlaying={this.props.running}
            startAt={this.props.startAt}
            renderTime={this.renderTime.bind(this)}
            size={500}
          />
        </div>
        <div className="exercise-description">
          <h1 className="ui block header">
            {this.props.exercise.name}
            <span>
              <i className="edit icon" onClick={() => this.props.edit()}></i>
            </span>
          </h1>
          <div className="ui segments">
            {this.props.exercise.image ? (
              <div className="ui segment">
                <img
                  className="exercise-description-image"
                  src={this.props.exercise.image}
                  alt={"Image of " + this.props.exercise.name}
                />
              </div>
            ) : null}
            {this.props.exercise.description ? (
              <div className="ui segment exercise-description-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.exercise.description
                  }}
                ></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addTime, setStoppedAt })(Exercise);
