import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryContainer,
  VictoryTooltip,
} from "victory";
import { LogType } from "@/types/global";

// interface SWRGql {
//   data: unknown;
//   error:
// }

const Graph: React.FC<{ logs: Array<LogType> }> = ({ logs }) => {
  // const maximaTemp: number = Math.max(
  //   ...logs.map((d) => parseFloat(d.temperature))
  // );
  // const maximaHumidity: number = Math.max(
  //   ...logs.map((d) => parseFloat(d.humidity))
  // );
  // const maximaLampOn: number = Math.max(
  //   ...logs.map((d) => parseFloat(d.lamp_on))
  // );
  const numberOfTicks: number = 8;
  // const normalisedValues: Array<number> = [...Array(numberOfTicks).keys()].map(
  //   (i) => (i + 1) / numberOfTicks
  // );
  console.log(logs);

  return (
    <div
      className="mb-8"
      style={{
        width: "100%",
      }}
    >
      <VictoryChart scale={{ x: "time", y: "linear" }}>
        <VictoryGroup>
          {/* <VictoryAxis crossAxis />
                    <VictoryAxis
                        dependentAxis
                        key={1}
                        label={'Temperature'}
                        style={{
                            axis: { stroke: "#f56565" },
                            tickLabels: { fill: "#f56565" }
                        }}
                    /> */}
          {/* <VictoryLine
            data={logs}
            x={(datum) => {
              return new Date(parseInt(datum.created_at));
            }}
            y={(datum) => {
              return parseFloat(datum.temperature);
            }}
            style={{
              data: { stroke: "#f56565" },
              labels: { fill: "#f56565" },
            }}
          /> */}
          <VictoryLine
            data={logs}
            x={(datum) => {
              return new Date(parseInt(datum.created_at));
            }}
            y={(datum) => {
              return datum.lamp_on === "true" ? 1 : 0;
            }}
            style={{
              data: { stroke: "#f56565" },
              labels: { fill: "#f56565" },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default Graph;
