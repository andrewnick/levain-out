import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryVoronoiContainer, VictoryGroup, VictoryTooltip } from 'victory'
import useSWR from 'swr'
import { query } from "../../graphql/gqlClient";

const GET_LOGS = `
  query {
    logs {
      id
      created_at
      temperature
      humidity
    }
  }
`;

const Graph = () => {

    const { data, error } = useSWR(GET_LOGS, query, {
        refreshInterval: 2000
    });

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const { logs } = data;
    console.log("hi");
    console.log(logs);

    return (
        <div className="mb-8" style={{
            width: '100%',
        }}>
            <VictoryChart
                scale={{ x: "time", y: "linear" }}
                containerComponent={
                    <VictoryVoronoiContainer voronoiDimension="x"
                        labels={({ datum }) => `Temperature: ${datum.temperature} Humidity: ${datum.humidity}`}
                        labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
                    />
                }
            >
                <VictoryAxis />
                <VictoryLine
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.temperature)
                    }}
                    style={{
                        data: { stroke: "tomato", strokeWidth: ({ active }) => active ? 4 : 2 },
                        labels: { fill: "tomato" }
                    }}
                />

                <VictoryLine
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.humidity)
                    }}
                    style={{
                        data: { stroke: "blue", strokeWidth: ({ active }) => active ? 4 : 2 },
                        labels: { fill: "white" }
                    }}
                />
            </VictoryChart>
        </div >
    )
}

export default Graph;