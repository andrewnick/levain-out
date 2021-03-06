import dhtSensor from "node-dht-sensor";
import { DhtSensorPromises } from "../node-dht-sensor";
import { Log } from "@/db/model/Log";
import { Session } from "@/db/model/Session";
import { Gpio, BinaryValue } from "onoff";
import { randomInt } from "./random";
import isMac from "./isMac";

const sw: Gpio | null = isMac() ? null : new Gpio(21, "out");
const sensor: DhtSensorPromises | null = isMac() ? null : dhtSensor.promises;
const sensorType: number = 22;
const sensorGPIO: number = 4;

const readSensor = async () => {
  if (isMac()) {
    return {
      temperature: randomInt(15, 30),
      humidity: randomInt(0, 100),
    };
  }

  const reading = await sensor.read(sensorType, sensorGPIO);

  const temperature = parseFloat(reading.temperature.toFixed(1));
  const humidity = parseFloat(reading.humidity.toFixed(1));

  const sess = await Session.currentSession();

  const onOff: BinaryValue = temperature > 28 ? 1 : 0;

  await switchOnOff(onOff);

  const log = new Log();
  log.temperature = temperature;
  log.humidity = humidity;
  log.switch = !!onOff;
  log.session = sess;

  await log.save();

  console.log(log);

  return reading;
};

const switchOnOff = async (onOff: BinaryValue) => {
  await sw.write(onOff);
}

// When we stop record 
export const endSession = async () => {
  // Turn acuator off
  switchOnOff(1)
  const sess = await Session.currentSession();
}

export default readSensor;
