import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Data } from '../../app/data';


import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayPage {
  posts: any;
  upload: any;
  data_received: any;
  data_to_show: any;
  //data_received_pretty: any;
  data_split_array: Array<any>;

  data: Data;
  data_array: Array<Data> = [];
  data_name: any;

  array_keys: Array<any> = [];

  array_values_calc_kd: Array<any> = [];
  array_z: Array<any> = [];
  array_clear: Array<any> = [];
  avg_array_clear: Array<any> = [];
  kd: any = 0;


  constructor(public navCtrl: NavController, public http: Http, private storage: Storage,
    private alertCtrl: AlertController, private ref: ChangeDetectorRef, ) {
    this.posts = null;
  }

  ngOnInit() {
    this.clear_screen();
  }

  clear_screen() {
    this.posts = null;
    this.upload = null;
    this.data_to_show = null;
  }


  startMeasure() {
    this.clear_screen();
    this.http.get('http://192.168.4.1/s').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.ref.markForCheck();
    });
  }

  stopMeasure() {
    this.clear_screen();
    this.http.get('http://192.168.4.1/x').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.ref.markForCheck();
    });
  }

  readMeasure() {
    let alert = this.alertCtrl.create({
      title: 'Save as',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            if (data.name) {
              this.data_name = data.name;
              console.log(data.name);
              console.log("choose download");
              return this.setDownload();
            } else {
              console.log("invalid");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  setDownload() {
    this.clear_screen();
    let alert = this.alertCtrl.create({
      title: 'Read from AP or\nDownload from Stations',
      inputs: [
        {
          type: 'radio',
          label: 'Read',
          value: 'ap'
        },
        {
          type: 'radio',
          label: 'Download',
          value: 'stations'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            if (data == "ap") {
              this.http.get('http://192.168.4.1/g').map(res => res.text()).subscribe(data => {
                this.data_received = data;

                var arr = data.split(",").filter(item => !item.includes("END"));
                var data_container = [];
                this.data_to_show = [];
                arr.forEach((item, index) => {
                  index++;
                  if (item.toString())
                    data_container.push(item);
                  if ((index % 7) == 0) {
                    this.data_to_show.push(data_container);
                    data_container = [];
                  }
                });
                this.processData();
                this.ref.markForCheck();
                console.log(this.data_array);
                //this.data_received_pretty = JSON.stringify(this.data_array,null, 2);

                this.data_array.forEach((item, index) => {

                  this.storage.get(item._timestamp).then(result => {

                    result.forEach((result_item, result_index) => {
                      if (result == null) {
                        this.storage.set(item._timestamp, this.data_array);
                      } else {

                        if (result_item.timestamp == item._timestamp) {
                          //console.log('Your data saved is', result);
                        } else {
                          console.log(this.data_array.filter(res => res._timestamp == result_item.timestamp));
                          this.storage.set(item._timestamp, this.data_array.filter(res => res._timestamp == result_item.timestamp));
                        }
                      }
                    });
                  }).catch(e => {
                    console.log("error: ");
                    console.log(e);
                  });
                  //this.key = item._timestamp;
                  //this.storage.set(item._timestamp, this.data_array);
                  //}
                });
              });
            }
            if (data == "stations") {
              this.http.get('http://192.168.4.1/r').map(res => res.text()).subscribe(data => {
                this.data_received = data;

                var arr = data.split(",").filter(item => !item.includes("END"));
                var data_container = [];
                this.data_to_show = [];
                arr.forEach((item, index) => {
                  index++;
                  if (item.toString())
                    data_container.push(item);
                  if ((index % 7) == 0) {
                    this.data_to_show.push(data_container);
                    data_container = [];
                  }
                });
                this.processData();
                console.log(this.data_array);
                this.ref.markForCheck();
                //this.data_received_pretty = JSON.stringify(this.data_array,null, 2);

                this.data_array.forEach((item, index) => {

                  this.storage.get(item._timestamp).then(result => {
                    if (result == null) {
                      this.storage.set(item._timestamp, this.data_array);
                    } else {
                      result.forEach((result_item, result_index) => {
                        if (result_item.timestamp == item._timestamp) {
                          //console.log('Your data saved is', result);
                        } else {
                          console.log(this.data_array.filter(res => res._timestamp == result_item.timestamp));
                          this.storage.set(item._timestamp, this.data_array.filter(res => res._timestamp == result_item.timestamp));
                        }
                      });
                      //console.log('Your data is', result);
                    }
                  }).catch(e => {
                    console.log("error: ");
                    console.log(e);
                  });
                  //this.key = item._timestamp;
                  //this.storage.set(item._timestamp, this.data_array);
                  //}
                });
              });

            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteMeasure() {
    this.clear_screen();
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            this.http.get('http://192.168.4.1/e').map(res => res.json()).subscribe(data => {
              this.posts = data;
              console.log(this.posts);
              this.ref.markForCheck();
            });
          }
        }
      ]
    });
    alert.present();
  }

  uploadMeasure() {
    this.clear_screen();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://xarlie32.pythonanywhere.com/connect').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.ref.markForCheck();
    });

    this.storage.forEach((value, key, index) => {
      this.storage.get(key).then((val) => {
        console.log('Your json is', val);
        //var data_json = JSON.stringify(val);
        //console.log(data_json);
        this.http.post('http://xarlie32.pythonanywhere.com/api/data/1', val,
          { headers: headers }).map(res => res.json()).subscribe(data => {
            this.upload = data;
            console.log(this.upload);
            this.ref.markForCheck();
          });
      });
    })

  }

  processData() {
    this.data_array = [];
    var is_metadata = false;
    var count = 0;
    var values: any[];
    this.data_split_array = this.data_received.split(",");
    this.data_split_array.forEach((item, index) => {
      if (item.indexOf("$") !== -1) {
        this.data = new Data();
        is_metadata = true;
        count = 0;
        var pos = item.indexOf("S");
        this.data._ip = item.slice(pos + 1);
      }
      if (item.indexOf("END") !== -1) {
        this.data_array.push(this.data);
        return;
      }
      if (is_metadata) {
        if (count == 1) {
          this.data._mac = item;
          this.data._name = this.data_name;
        }
        if (count == 2) {
          this.data._measurement_time = item;
        }
        if (count == 3) {
          this.data._depth = item;
        }
        if (count == 4) {
          this.data._timestamp = item;
        }
        if (count == 5) {
          this.data._latitude = item;
        }
        if (count == 6) {
          this.data._longitude = item;
        }
      } else {
        if (count == 0) {
          values = [];
          values.push({ "count": item });
        }
        if (count == 1) {
          values.push({ "temp": item });
        }
        if (count == 2) {
          values.push({ "lux": item });
        }
        if (count == 3) {
          values.push({ "red": item });
        }
        if (count == 4) {
          values.push({ "green": item });
        }
        if (count == 5) {
          values.push({ "blue": item });
        }
        if (count == 6) {
          values.push({ "clear": item });
          this.data._values = values;
        }
      }
      if ((count !== 0) && (count % 6 == 0)) {
        count = -1;
        is_metadata = false;
      }
      count++;
    });
    /*this.data_array.forEach((item, index) => {
      console.log(item);
    });*/
  }
  /*
  async getKeysFromStorage(): Promise<Array<any>> {
    var array_keys: Array<any> = [];
    this.storage.forEach((value, key, index) => {
      array_keys.push(key);
    });
    return await array_keys;
  }
  */

  getKeysFromStorage() {
    this.array_keys = [];
    this.storage.forEach((value, key, index) => {
      this.array_keys.push(key);
    });
    setTimeout(() => {
      this.selectKd();
    },
      1000);
  }

  selectKd() {
    this.array_values_calc_kd = [];
    this.array_z = [];
    this.array_clear = [];
    this.avg_array_clear = [];

    let alert = this.alertCtrl.create();
    alert.setTitle('Which one do you want to calculate Kd?');

    this.array_keys.forEach(function (element, index) {
      alert.addInput({
        type: 'radio',
        label: element,
        value: element,
      });

    })
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Accept',
      handler: data => {
        this.storage.get(data).then((val) => {
          this.array_values_calc_kd = val;
        });
      }
    });
    alert.present();
  }

  processKd() {
    this.array_values_calc_kd.forEach(element => {
      this.array_z.push(Number(element.depth));
      var array_values = element.values;

      array_values.forEach(value => {
        this.array_clear.push(Math.log(value[6].clear));
      });

      console.log(this.array_clear);
      var sum = this.array_clear.reduce(function (a, b) { return a + b; });
      this.avg_array_clear.push(sum / this.array_clear.length);
      this.array_clear = [];
    });
    console.log(this.array_z);
    console.log(this.avg_array_clear);
    this.kd = this.linearRegression(this.array_z, this.avg_array_clear);
  }

  todo_share() {
  }

  todo_settings() {
  }


  linearRegression(y, x) {
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

      sum_x += x[i];
      sum_y += y[i];
      sum_xy += (x[i] * y[i]);
      sum_xx += (x[i] * x[i]);
      sum_yy += (y[i] * y[i]);
    }

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr['slope'] * sum_x) / n;
    lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

    return lr;
  }

}
