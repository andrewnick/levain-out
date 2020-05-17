import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter } from 'victory'
const Graph = ({ logs }) => {
    console.log("graph: ", logs);

    return (
        <div className="mb-8" style={{
            width: '100%',
        }}>

            <VictoryChart
                scale={{ x: "time", y: "linear" }}
            // theme={VictoryTheme.material}
            >
                <VictoryLine
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
                />
                <VictoryScatter
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
                />
                <VictoryAxis dependentAxis
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
                />
            </VictoryChart>
        </div >
    )
}

export default Graph;