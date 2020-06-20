import { Gpio } from 'onoff';

const sw = new Gpio(21, 'out');

let onOff = 0;

const toggleLED = async () => {
  onOff = onOff ? 0 : 1;
  console.log(onOff);

  const s = await sw.write(onOff);
  return onOff;
}

export default toggleLED;
