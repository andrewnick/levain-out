import dhtSensor from "node-dht-sensor";
import Log from '../db/models/Log'

const sensorType = 22;
const sensorGPIO = 4;

dhtSensor.initialize({
    test: {
        fake: {
            temperature: 21,
            humidity: 60
        }
    }
});

const sensor = dhtSensor.promises

// sensor.readSync(sensorType, sensorGPIO, function (err, temperature, humidity) {
//     if (!err) {
//         console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
// });

const readSensor = async () => {
    const reading = await sensor.read(sensorType, sensorGPIO);
    console.log(reading);

    const add = await new Log().add(reading.temperature, reading.humidity);
    console.log(add);

    return reading;
}

export default readSensor;