export class Data {

  private _ip: {};
  private _mac: {};
  private _depth: {};
  private _measurement_time: {};
  private _timestamp: {};
  private _latitude: {};
  private _longitude: {};
  private _values: any[] = [];

  public constructor() { };

  get ip(): any {
    return this._ip;
  }

  set ip(ip: any) {
    this._ip = ip;
  }

  get mac(): any {
    return this._mac;
  }

  set mac(mac: any) {
    this._mac = mac;
  }

  get depth(): any {
    return this._depth;
  }

  set depth(depth: any) {
    this._depth = depth;
  }

  get measurement_time(): any {
    return this._measurement_time;
  }

  set measurement_time(measurement_time: any) {
    this._measurement_time = measurement_time;
  }

  get timestamp(): any {
    return this._timestamp;
  }

  set timestamp(timestamp: any) {
    this._timestamp = timestamp;
  }

  get latitude(): any {
    return this._latitude;
  }

  set latitude(latitude: any) {
    this._latitude = latitude;
  }

  get longitude(): any {
    return this._longitude;
  }

  set longitude(longitude: any) {
    this._longitude = longitude;
  }

  get values(): any {
    return this._values;
  }

  set values(values: any) {
    this._values.push(values);
  }

}