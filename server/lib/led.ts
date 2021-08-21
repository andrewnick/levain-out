import { Gpio, BinaryValue } from "onoff";
import isMac from "./isMac";
import { randomBool } from "./random";

const sw = isMac() ? null : new Gpio(21, "out");

let onOff: BinaryValue = 0;

const toggleLED = async () => {
  if (isMac()) {
    return randomBool();
  }

  onOff = onOff ? 0 : 1;

  const s = await sw.write(onOff);
  return onOff;
};

export default toggleLED;
