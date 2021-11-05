import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis
} from "victory";
import { Log, PlotDataType } from "../../../types/global";
import Plot from "./Plot";

interface Graph {
  logs: Log[]
}

const Graph = ({ logs }: Graph) => {

  const tempData: PlotDataType[] = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: parseFloat(log.temperature)
  }));

  const humidityData: PlotDataType[] = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: parseFloat(log.humidity)
  }));

  const lampData: PlotDataType[] = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: log.switch === "true" ? 1 : 0
  }));

  return (
    <div
      className="mb-8"
      style={{
        width: "100%",
      }}
    >
      <VictoryChart scale={{ x: "time", y: "linear" }} domain={{ y: [0, 1] }}>
        <VictoryAxis />
        <Plot
          data={tempData}
          divisor={5}
          color="#f56565"
          label="Temp"
          orient={'right'}
        />
        <Plot
          data={humidityData}
          divisor={10}
          color="#3574ca"
          label="Humidity"
          orient={'left'}
        />
        <Plot
          data={lampData}
          divisor={1}
          color="rgba(53,116, 202, 0.3)"
          label="Lamp"
          hideAxis={true}
          orient={'right'}
        />

        {/* Hack to display the VictoryLines within Plot */}
        <VictoryLine
          data={logs}
          x={(datum) => new Date(parseInt(datum.created_at))}
          y={() => 0}
          style={{
            data: { opacity: 0 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Graph;
