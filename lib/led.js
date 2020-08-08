import { Gpio } from "onoff";
import isMac from "../lib/isMac";
import { randomBool } from "./random";

const sw = isMac() ? null : new Gpio(21, "out");

let onOff = 0;

const toggleLED = async () => {
  if (isMac()) {
    return randomBool();
  }

  onOff = onOff ? 0 : 1;
  console.log(onOff);

  const s = await sw.write(onOff);
  return onOff;
};

export default toggleLED;
