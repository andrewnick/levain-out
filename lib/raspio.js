import five from "johnny-five";
import { RaspiIO } from "raspi-io";
import Log from '../db/models/Log'

const RaspIOInit = () => {
    const board = new five.Board({
        io: new RaspiIO()
    });

    const button = new five.Button("P1-33");
    const led = new five.Led("P1-11");
    let isLedOn = false;

    board.repl.inject({
        button: button
    });

    // board.on("ready", function () {
    //     var led = new five.Led("P1-13");
    //     // led.blink();
    // });

    // "down" the button is pressed
    // button.on("down", function () {
    //     console.log("down");
    //     led.off()
    //     isLedOn = false;
    // });

    // "hold" the button is pressed for specified time.
    //        defaults to 500ms (1/2 second)
    //        set
    // button.on("hold", function () {
    //     console.log("hold");
    //     console.log(led);

    //     led.on()
    //     isLedOn = true;
    // });

    // "up" the button is released
    button.on("up", function () {
        console.log("up");
        if (isLedOn) {
            led.off()
            isLedOn = false;
        } else {
            led.on()
            isLedOn = true;
        }

        const log = Log.add(isLedOn ? 1 : 0);
    });
}

export default RaspIOInit;