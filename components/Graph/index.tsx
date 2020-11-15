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
import { LogType, PlotDataType } from "@/types/global";
import Plot from "./Plot";


const highestTickValue: (max: number, divisor: number) => number = (max, divisor) => {
  const maxUpperTemp: number = Math.ceil(max);
  const upperTempModulo: number =  maxUpperTemp % divisor;
  return maxUpperTemp + (divisor - upperTempModulo);
}

const createTicks: (max: number, divisor: number) => Array<number> = (max, divisor) => {
  const upperValue = highestTickValue(max, divisor);
  const numberOfTicks = (upperValue / divisor) + 1;

  let ticks: Array<number> = [];
  for (let index = 0; index < numberOfTicks; index++) {
    ticks = [
      ...ticks,
      index * divisor
    ];
  }
  
  const normalizedTicks = ticks.map(tick => tick / upperValue);

  return normalizedTicks;
} 

const Graph: React.FC<{ logs: Array<LogType> }> = ({ logs }) => {

  // Temperature Calculations
  const tempDivisor: number = 5;
  const maxTemp: number = Math.max(
    ...logs.map((d) => parseFloat(d.temperature))
  );
  const tempUpperValue = highestTickValue(maxTemp, tempDivisor);
  const maximaTemp: number = maxTemp * (tempUpperValue / maxTemp);
  const tempTicks = createTicks(maxTemp, tempDivisor);
  
  // Humidity Calculations
  const humidityDivisor: number = 10;
  const maxHumidity: number = Math.max(
    ...logs.map((d) => parseFloat(d.humidity))
  );
  const humidityUpperValue = highestTickValue(maxHumidity, humidityDivisor);
  const maximaHumidity: number = maxHumidity * (humidityUpperValue / maxHumidity);
  const humidityTicks = createTicks(maxHumidity, humidityDivisor);

  // Lamp Calculations
  const maximaLampOn: number = 1;

  const tempData: Array<PlotDataType> = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: parseFloat(log.temperature)
  }));

  const humidityData: Array<PlotDataType> = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: parseFloat(log.humidity)
  }));

  const lampData: Array<PlotDataType> = logs.map((log) => ({
    x: parseInt(log.created_at),
    y: log.lamp_on === "true" ? 1 : 0
  }));

  // console.log(tempData);
  // console.log(logs);

  return (
    <div
      className="mb-8"
      style={{
        width: "100%",
      }}
    >
      <VictoryChart scale={{ x: "time", y: "linear" }} domain={{ y: [0, 1] }}>
        {/* <VictoryGroup> */}
        <VictoryAxis />
        <Plot 
          data={tempData} 
          divisor={5}
          color="#f56565" 
          label="Temp"
        />
        <Plot 
          data={humidityData} 
          divisor={10}
          color="#3574ca" 
          orientation="right"
          label="Humidity"
        />
        <Plot 
          data={lampData} 
          divisor={1}
          color="rgba(53,116, 202, 0.3)" 
          orientation="right"
          label="Lamp"
          hideAxis={true}
        />
        {/* <VictoryAxis
          dependentAxis
          key={1}
          offsetX={300}
          label={"Temperature"}
          style={{
            axis: { stroke: "#f56565" },
            tickLabels: { fill: "#f56565" },
          }}
          tickValues={tempTicks}
          tickFormat={(t) => t * tempUpperValue}
        />
        <VictoryLine
          data={logs}
          interpolation="monotoneX"
          x={(datum) => {
            return new Date(parseInt(datum.created_at));
          }}
          y={(datum) => {
            return parseFloat(datum.temperature) / maximaTemp;
          }}
          style={{
            data: { stroke: "#f56565" },
            labels: { fill: "#f56565" },
          }}
        /> */}

        {/* <VictoryAxis
          dependentAxis
          key={1}
          offsetX={200}
          label={"Humidity"}
          style={{
            axis: { stroke: "#3574ca" },
            tickLabels: { fill: "#3574ca" },
          }}
          tickValues={humidityTicks}
          tickFormat={(t) => t * humidityUpperValue }
        /> */}
        {/* Hack to display the VictoryLines within Plot */}
        <VictoryLine
            data={logs}
            interpolation="monotoneX"
            x={(datum) => {
              return new Date(parseInt(datum.created_at));
            }}
            y={() => {              
              return 0;
            }}
            style={{
              data: { stroke: "#3574ca", opacity: 0 },
              // labels: { fill: "#3574ca", opacity: 0 },
            }}
          />

          {/* <VictoryAxis
            dependentAxis
            key={1}
            // offsetX={300}
            label={"Lamp On"}
            style={{
              axis: { stroke: "#f56565" },
              tickLabels: { fill: "#f56565" },
            }}
            // Use normalized tickValues (0 - 1)
            tickValues={[0, 1]}
            // Re-scale ticks by multiplying by correct maxima
            tickFormat={(t) => t * maximaLampOn }
          /> */}
          {/* <VictoryLine
            data={logs}
            interpolation="monotoneX"
            x={(datum) => {
              return new Date(parseInt(datum.created_at));
            }}
            y={(datum) => {
              return datum.lamp_on === "true" ? maximaLampOn : 0;
            }}
            style={{
              data: { stroke: "#3574ca", opacity: 0.3 },
              labels: { fill: "#3574ca", opacity: 0.3 },
            }}
          /> */}
        {/* </VictoryGroup> */}
      </VictoryChart>
    </div>
  );
};

export default Graph;
