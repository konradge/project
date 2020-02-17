/*
  Zeige die in data.values übergenenen Daten in einem Graphen an
*/
import React from "react";
import { Chart, Dataset } from "react-rainbow-components";

export default function ChartComponent(props) {
  console.log(props.data.values);
  return (
    <div className="chart">
      <Chart
        style={{ width: "500px" }}
        labels={props.data.values.map(val => val.label)}
        type="line"
        disableAnimations
      >
        <Dataset
          title={props.data.title}
          values={props.data.values.map(val => parseInt(val.value))}
          backgroundColor={props.backgroundColor}
          borderColor={props.borderColor}
        />
      </Chart>
    </div>
  );
}
