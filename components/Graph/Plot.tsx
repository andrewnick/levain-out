import React from "react";
import {
  VictoryLine,
  VictoryAxis,
  VictoryGroup,
  VictoryLabel,
} from "victory";
import { PlotDataType } from "@/types/global";

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

const Plot: React.FC<{ 
  data: Array<PlotDataType>, 
  label: string 
  axisOffsetX: number 
  color: string,
  divisor: number,
  hideAxis?: boolean,
  other?: any
}> = ({ data, label, axisOffsetX, color, divisor, hideAxis=false, ...other }) => {

  const max: number = Math.max(
    ...data.map((datum) => datum.y)
  );
  const upperValue: number = highestTickValue(max, divisor);
  const maxima: number = max * (upperValue / max);
  const tempTicks: Array<number> = createTicks(max, divisor);

  return (
    <>
        { !hideAxis &&
            <VictoryAxis
              {...other}
              dependentAxis
              label={label}
              style={{
                axis: { stroke: color },
                tickLabels: { fill: color },
              }}
              tickValues={tempTicks}
              tickFormat={(t) => t * upperValue}
            />
        }
        <VictoryLine
          {...other}
          data={data}
          interpolation="monotoneX"
          x={(datum) => {
            return new Date(datum.x);
          }}
          y={(datum) => {
            return datum.y / maxima;
          }}
          style={{
            data: { stroke: color },
            labels: { fill: color },
          }}
        />
    </>
  );
};

export default Plot;
