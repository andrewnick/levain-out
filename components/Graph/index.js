import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
} from "victory";
import useSWR from "swr";
import { query } from "../../graphql/gqlClient";

const GET_LOGS = `
  query {
    logs {
      id
      created_at
      temperature
      humidity
      lamp_on
    }
  }
`;

const Graph = () => {
  const { data, error } = useSWR(GET_LOGS, query, {
    refreshInterval: 2000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { logs } = data;
  const maximaTemp = Math.max(...logs.map((d) => d.temperature));
  const maximaHumidity = Math.max(...logs.map((d) => d.humidity));
  const maximaLampOn = Math.max(...logs.map((d) => d.lamp_on));
  const numberOfTicks = 8;
  const normalisedValues = [...Array(numberOfTicks).keys()].map(
    (i) => (i + 1) / numberOfTicks
  );
  console.log(normalisedValues);
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
