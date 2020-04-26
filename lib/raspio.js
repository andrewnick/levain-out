// const five = require("johnny-five");
// const button;
// const Raspi = require("raspi-io").RaspiIO;

// const RaspIOInit = () => {
//     const board = new five.Board({
//         io: new RaspiIO()
//     });

//     button = new five.Button("P1-33");
//     const led = new five.Led("P1-11");

//     board.on("ready", function () {
//         var led = new five.Led("P1-13");
//         led.blink();
//     });

//     // "down" the button is pressed
//     button.on("down", function () {
//         console.log("down");
//         led.off()
//     });

//     // "hold" the button is pressed for specified time.
//     //        defaults to 500ms (1/2 second)
//     //        set
//     button.on("hold", function () {
//         console.log("hold");
//         console.log(led);

//         led.on()
//     });

//     // "up" the button is released
//     button.on("up", function () {
//         console.log("up");
//         // led.off()
//     });
// }

// export default RaspIOInit;