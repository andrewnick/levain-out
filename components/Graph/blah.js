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
        // refreshInterval: 2000
    });

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const { logs } = data;

    return (
        <div className="mb-8" style={{
            width: '100%',
        }}>
            {/* <VictoryChart
                scale={{ x: "time", y: "linear" }}
                containerComponent={<VictoryVoronoiContainer />}
                theme={VictoryTheme.material}
            > */}
            {/* <VictoryGroup
                    color="#c43a31"
                    // labels={({ datum }) => `y: ${datum.temperature.toString()}`}
                    labelComponent={
                        <VictoryTooltip
                            style={{ fontSize: 10 }}
                        />
                    }
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.temperature)
                    }}
                > */}
            {/* <VictoryLine /> */}
            {/* <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc", fontSize: '10px' }
                        }}
                        data={logs}

                    /> */}
            {/* <VictoryScatter
                        size={({ active }) => active ? 8 : 3}

                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc", fontSize: '10px' }
                    }}
                    data={logs}
                    x={(datum) => {
                        return new Date(parseInt(datum.created_at))
                    }}
                    y={(datum) => {
                        return parseInt(datum.temperature)
                    }}
                    /> */}
            {/* </VictoryGroup> */}
            {/* <VictoryAxis dependentAxis
                    label="temperature"
                    domain={[15, 30]}
                    style={{
                        axisLabel: { padding: 30, fontSize: 10 },
                    }}
                />
                <VictoryAxis
                    label="time"
                    style={{
                        axisLabel: { padding: 40 }
                    }}
                /> */}
            {/* </VictoryChart> */}
        </div >
    )
}

export default Graph;