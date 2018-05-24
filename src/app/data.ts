export class Data {

  private ip: {};
  private mac: {};
  private depth: {};
  private measurement_time: {};
  private timestamp: {};
  private latitude: {};
  private longitude: {};
  private values: any[] = [];

  public constructor() { };

  get _ip(): any {
    return this.ip;
  }

  set _ip(ip: any) {
    this.ip = ip;
  }

  get _mac(): any {
    return this.mac;
  }

  set _mac(mac: any) {
    this.mac = mac;
  }

  get _depth(): any {
    return this.depth;
  }

  set _depth(depth: any) {
    this.depth = depth;
  }

  get _measurement_time(): any {
    return this.measurement_time;
  }

  set _measurement_time(measurement_time: any) {
    this.measurement_time = measurement_time;
  }

  get _timestamp(): any {
    return this.timestamp;
  }

  set _timestamp(timestamp: any) {
    this.timestamp = timestamp;
  }

  get _latitude(): any {
    return this.latitude;
  }

  set _latitude(latitude: any) {
    this.latitude = latitude;
  }

  get _longitude(): any {
    return this.longitude;
  }

  set _longitude(longitude: any) {
    this.longitude = longitude;
  }

  get _values(): any {
    return this.values;
  }

  set _values(values: any) {
    this.values.push(values);
  }

}