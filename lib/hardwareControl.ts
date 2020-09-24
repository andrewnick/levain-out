import dhtSensor from "node-dht-sensor";
import { DhtSensorPromises } from "../node-dht-sensor";
import Log from "@/db/models/Log";
import Session from "@/db/models/Session";
import { Gpio } from "onoff";
import { randomInt } from "./random";
import isMac from "./isMac";

const sw: Gpio | null = isMac() ? null : new Gpio(21, "out");
const sensor: DhtSensorPromises | null = isMac() ? null : dhtSensor.promises;
const sensorType: number = 22;
const sensorGPIO: number = 4;

// dhtSensor.initialize({
//     test: {
//         fake: {
//             temperature: getRandomInt(15, 30),
//             humidity: getRandomInt(0, 100)
//         }
//     }
// });

// sensor.readSync(sensorType, sensorGPIO, function (err, temperature, humidity) {
//     if (!err) {
//         console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
// });

// const readSensor = async () => {
//   return {
//     temperature: 24.23,
//     humidity: 54.12,
//   };
// };

const readSensor = async () => {
  if (isMac()) {
    return {
      temperature: randomInt(15, 30),
      humidity: randomInt(0, 100),
    };
  }

  // const reading = await sensor.read(sensorType, sensorGPIO);
  // // console.log(reading);

  // const temperature = parseFloat(reading.temperature.toFixed(1));
  // const humidity = parseFloat(reading.humidity.toFixed(1));

  // const sess = await new Session().getCurrentSession();

  // // const onOff = 1;
  // const onOff = temperature > 22 ? 0 : 1;
  // const s = await sw.write(onOff);

  // const add = await sess.$relatedQuery<Log>("logs").insert({
  //   temperature: temperature,
  //   humidity: humidity,
  //   lamp_on: !!onOff,
  // });

  // console.log(add);

  // return reading;
};

export default readSensor;
