import React, { Component } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import dateFormat from "dateformat";
import { isSameDay, unique } from "../../helpers";
import { connect } from "react-redux";
class Timeline extends Component {
  today = new Date();
  lastTrainingDates = this.props.lastWorkouts.map(workout => workout.date);
  //Das Element (also Datum), dass auf der Timeline ausgewählt wurde
  state = { index: null };
  //Daten, an denen mind. ein Training durchgeführt wurde
  uniqueDaysWithTraining = [];
  componentDidMount() {
    this.uniqueDaysWithTraining = this.getValues();
    this.setState({ index: this.uniqueDaysWithTraining.length - 1 });
  }
  buildTimeline() {
    //Die eigentliche Timeline
    return (
      <div style={{ width: "100%", height: "100px", margin: "0 auto" }}>
        <HorizontalTimeline
          index={this.state.index || 0}
          values={this.getValues()}
          indexClick={index => {
            this.setState({ index });
          }}
          getLabel={date => {
            if (date.getYear() === this.today.getYear()) {
              return dateFormat(date, "dd.mm.");
            } else {
              return dateFormat(date, "dd.mm.yy");
            }
          }}
          styles={{ foreground: "darkgreen", outline: "rgb(0,0,139)" }}
          isOpenBeginning={false}
        />
      </div>
    );
  }
  getValues() {
    //TODO: Ältester Eintrag

    //Reduziere Trainingsdaten (this.lastTrainingDates) so, dass jedes Datum nur noch einmal vorhanden ist
    if (this.lastTrainingDates.length === 0) {
      //Falls noch kein Training durchgeführt wurde, gib nur das heutige Datum zurück
      //(Dann wird "Noch kein Training heute" angezeigt)
      return [new Date()];
    }
    //Filtere letzte Trainings so, dass jedes Datum nur noch einmal vorhanden ist

    return this.lastTrainingDates.filter((elem, index, arr) => {
      if (index === 0) {
        return true;
      }
      return !isSameDay(arr[index - 1], elem);
    });
  }
  render() {
    let filteredTrainings = [];
    if (this.uniqueDaysWithTraining.length > 0) {
      //Zeige ausgewählten oder heutigen Tag an
      let index = this.state.index;
      if (index == null) {
        index = this.uniqueDaysWithTraining.length - 1;
      }

      //Finde Traings-Titel an diesem Tag
      let trainingsOnSelectedDay = this.props.lastWorkouts
        .filter(t => isSameDay(t.date, this.uniqueDaysWithTraining[index]))
        .map(t => t.title);
      //Reduziere diese auf einzigartige Trainings
      filteredTrainings = unique(trainingsOnSelectedDay);
      //Zähle, wie oft diese vorkommen
      filteredTrainings = filteredTrainings.map(name => {
        return {
          name,
          count: trainingsOnSelectedDay.reduce((acc, val) => {
            return acc + (val === name ? 1 : 0);
          }, 0)
        };
      });
    }
    return (
      <div>
        {this.buildTimeline()}
        <div className="ui list">
          {filteredTrainings.length === 0
            ? "--No trainings today--"
            : filteredTrainings.map(t => (
                <div key={t.name}>
                  {t.count} X {t.name}
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    lastWorkouts: state.userData.history.lastWorkouts
  };
})(Timeline);
