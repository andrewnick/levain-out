declare module "node-dht-sensor" {
  export function fn(): string;
  export function initialize(type: number | object, pin: number): any;
  export function read(type: number, pin: number): Promise<any>;
  export function setMaxRetries(retries: number): void;
  export let promises: DhtSensorPromises;
}

export declare interface DhtSensorPromises {
  initialize(type: number, pin: number): any;
  read(type: number, pin: number): Promise<any>;
  readSync(type: number, pin: number): object;
  setMaxRetries(retries: number): void;
}
