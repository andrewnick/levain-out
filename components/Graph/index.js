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
    const maximaTemp = Math.max(...logs.map((d) => d.temperature));
    const maximaHumidity = Math.max(...logs.map((d) => d.humidity));
    const maximaLampOn = Math.max(...logs.map((d) => d.lamp_on));
    const numberOfTicks = 8;
    const normalisedValues = [...Array(numberOfTicks).keys()].map(i => (i + 1) / numberOfTicks)
    console.log(normalisedValues);


    return (
        <div className="mb-8" style={{
            width: '100%',
        }}>
            <VictoryChart
                scale={{ x: "time", y: "linear" }}
                domain={{ y: [0, 1] }}
                containerComponent={
                    <VictoryVoronoiContainer voronoiDimension="x"
                        labels={({ datum }) => `Temperature: ${datum.temperature} Humidity: ${datum.humidity}`}
                        labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
                    />
                }
            >
                <VictoryAxis crossAxis />
                {/* <VictoryAxis
                    dependentAxis
                    key={1}
                    label={'Humidity'}
                    style={{
                        axis: { stroke: "#5353ff" },
                        tickLabels: { fill: "#5353ff" }
                    }}
                    // Use normalized tickValues (0 - 1)
                    tickValues={normalisedValues}
                    tickFormat={(t) => t * maximaHumidity}
                // maxDomain={{ y: maximaTemp }}
                /> */}
                {/* <VictoryAxis
                    dependentAxis
                    key={1}
                    label={'Lamp'}
                    orientation="right"
                    style={{
                        axis: { stroke: "#4caf50" },
                        tickLabels: { fill: "#4caf50" }
                    }}
                    // Use normalized tickValues (0 - 1)
                    tickValues={['On', 'Off']}
                    tickFormat={(t) => t}
                /> */}
                <VictoryAxis
                    dependentAxis
                    key={1}
                    label={'Temperature'}
                    style={{
                        axis: { stroke: "#f56565" },
                        tickLabels: { fill: "#f56565" }
                    }}
                    // Use normalized tickValues (0 - 1)
                    tickValues={normalisedValues}
                    tickFormat={(t) => t * maximaTemp}
                />
                <VictoryLine
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.temperature) / maximaTemp
                    }}
                    style={{
                        data: { stroke: "#f56565" },
                        labels: { fill: "#f56565" }
                    }}
                />
                {/* 
                <VictoryLine
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.humidity) / maximaHumidity
                    }}
                    style={{
                        data: { stroke: "#5353ff", strokeWidth: 1 },
                        labels: { fill: "#5353ff" }
                    }}
                /> */}
                <VictoryLine
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return datum.lamp_on ? 1 : 0
                    }}
                    style={{
                        data: { stroke: "#4caf50", strokeWidth: 1 },
                        labels: { fill: "#4caf50" }
                    }}
                />
            </VictoryChart>
        </div >
    )
}

export default Graph;