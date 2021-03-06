import Log from '../db/models/Log'
import Session from '../db/models/Session';
import { Gpio } from 'onoff';
import getRandomInt from './randomInt';
import max31855 from '../driver/max31855'

const sw = new Gpio(21, 'out');

const thermoSensor = new max31855();

const readSensor = async () => {
    const reading = await Promise.resolve(23);

    thermoSensor.readTempC(async function (temp) {
        console.log('Temp in degrees celsius: ', temp);
        const reading = await Promise.resolve(temp);

        const temperature = parseFloat(temp.toFixed(1));
        const humidity = parseFloat(50);

        const sess = await new Session().getCurrentSession()

        const onOff = temperature > 28 ? 0 : 1;
        const s = await sw.write(onOff);

        const add = await sess.$relatedQuery('logs').insert({
            temperature: temperature,
            humidity: humidity,
            lamp_on: !!onOff
        });

        console.log(add);

        return reading;
    });
    // console.log(reading);

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