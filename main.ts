
// some known constants
const MICROSECOND_PER_SECOND = 1e6;
const NINETY_DEGREES = 90;
const DISTANCE_PER_SECOND = 100;

// you should know this from the Calibratior_90
const DEGREES_PER_SECOND = 240;

// you should know this from the forward calibrator
const P1_FORWARD = 68;
const P2_FORWARD = 180;

const P1_CIRCLE = P1_FORWARD + (90 - P1_FORWARD) / 2;
const P2_CIRCLE = P2_FORWARD + (90 - P2_FORWARD) / 2;

const steps = 1e3;


const secondsPerStep = 0.05;

//startup code
let p1Value = P1_CIRCLE;
let p2Value = P2_FORWARD;

const makeASpiral = () => {
    //make spiral
    for (let i = 0; i < steps; i++) {
        //output
        pins.servoWritePin(AnalogPin.P1, p1Value);
        pins.servoWritePin(AnalogPin.P2, p2Value);
        control.waitMicros(secondsPerStep * MICROSECOND_PER_SECOND);

        //update values
        p1Value += (90 - P1_CIRCLE)/steps;
    }

    //stop
    pins.servoWritePin(AnalogPin.P1, 90);
    pins.servoWritePin(AnalogPin.P2, 90);

    //restart values
    p1Value = P1_FORWARD;
    p2Value = P2_FORWARD;
}

// let microbit know that whenever a is pressed we ask it to move forward
input.onButtonPressed(Button.A, function () {
    // wait half a sec
    control.waitMicros(0.5 * MICROSECOND_PER_SECOND);
    makeASpiral();
})