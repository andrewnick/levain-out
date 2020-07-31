import dhtSensor from "node-dht-sensor";
import Log from '../db/models/Log'
import Session from '../db/models/Session';
import { Gpio } from 'onoff';
import getRandomInt from './randomInt';

const sw = new Gpio(21, 'out');

const sensorType = 22;
const sensorGPIO = 4;

// dhtSensor.initialize({
//     test: {
//         fake: {
//             temperature: getRandomInt(15, 30),
//             humidity: getRandomInt(0, 100)
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
    // console.log(reading);

    const temperature = parseFloat(reading.temperature.toFixed(1));
    const humidity = parseFloat(reading.humidity.toFixed(1));

    const sess = await new Session().getCurrentSession()

    // const onOff = 1;
    // const s = await sw.write(onOff);
    const onOff = temperature > 26 ? 0 : 1;
    const s = await sw.write(onOff);

    const add = await sess.$relatedQuery('logs').insert({
        temperature: temperature,
        humidity: humidity,
        lamp_on: onOff
    });

    console.log(add);
    // logs = await new Log().getAllLogs();
    // console.log(logs);

    // const add = await new Log().add(temperature, humidity);
    // console.log(temperature);
    // console.log(humidity);

    // const onOff = temperature > 20 ? 0 : 1;
    // const s = await sw.write(onOff);

    return reading;
}

export default readSensor;