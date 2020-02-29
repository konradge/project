import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Speech from "speak-tts";
import { connect } from "react-redux";
import { addTime, setPause } from "../../actions";

class PauseScreen extends Component {
  state = { speech: null, lastTime: 0, pauseEnded: false };
  async componentDidMount() {
    window.addEventListener("beforeunload", this.beforeunload);
    const speech = new Speech();
    await speech.init({ lang: "en-GB" });

    this.setState({ speech });
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeunload);
    this.props.setPause(this.state.time);
  }
  beforeunload = () => {
    this.props.setPause(this.state.lastTime);
  };
  renderTime = time => {
    if (this.state.lastTime !== time) {
      if (this.state.speech) {
        if (time > 0 && time < 4) {
          this.state.speech.speak({ text: "" + time, queue: false });
        }
      }
      this.props.addTime(1);

      this.setState({ lastTime: time });
    }
    if (time <= 0) {
      this.props.setPause(null);
      this.props.endPause();
    }
    return (
      <div className="timer-description">
        <div className="time">{time}s</div>
        <h1>Pause...</h1>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="timer-div">
          <CountdownCircleTimer
            className="timer"
            durationSeconds={this.props.time}
            renderTime={this.renderTime}
            colors={[["#f00", 0.33], ["#ff0", 0.33], ["#0f0"]]}
            isPlaying={this.props.isRunning}
            size={500}
          />
        </div>
        <div className="pause-description relative-position">
          <div className="vertical-center">
            <div className="next-exercise">
              Next exercise:
              <h1
                onClick={() => {
                  this.setState({ pauseEnded: true });
                  this.props.endPause();
                }}
              >
                <i className="ui angle double right icon"></i>
                {this.props.nextExercise}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => {
    return { pause: state.current.pause };
  },
  { addTime, setPause }
)(PauseScreen);
