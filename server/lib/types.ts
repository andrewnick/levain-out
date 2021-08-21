export enum Switch {
    ON='on',
    OFF='off'
}

export default interface Controller {
    outputControl(switch: Switch): void;
    addRecord(record: Record<string, unknown>): void;
    startRecording(): void;
    stopRecording(): void;
}