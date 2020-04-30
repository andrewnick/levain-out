import dhtSensor from "node-dht-sensor";
import Log from '../db/models/Log'
import { Gpio } from 'onoff';

const sw = new Gpio(17, 'out');

const sensorType = 22;
const sensorGPIO = 4;

// dhtSensor.initialize({
//     test: {
//         fake: {
//             temperature: 21,
//             humidity: 60
//         }
//     }
// });

const sensor = dhtSensor.promises

// sensor.readSync(sensorType, sensorGPIO, function (err, temperature, humidity) {
//     if (!err) {
//         console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
// });

const readSensor = async () => {
    const reading = await sensor.read(sensorType, sensorGPIO);
    console.log(reading);

    const temperature = parseFloat(reading.temperature.toFixed(1));
    const humidity = parseFloat(reading.humidity.toFixed(1));

    const add = await new Log().add(temperature, humidity);
    console.log(temperature);
    console.log(humidity);
    const onOff = temperature > 20 ? 0 : 1;
    const s = await sw.write(onOff);

    return reading;
}

export default readSensor;