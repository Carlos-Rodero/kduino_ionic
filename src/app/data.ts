export class Data {
    ip: string;
    mac: string;
    depth: number;
    measurement_time: number;
    timestamp: string = new Date().toISOString();
    latitude: string;
    longitude: string;
  }