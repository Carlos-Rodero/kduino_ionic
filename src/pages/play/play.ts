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
  data_received_pretty: any;
  data_split_array: Array<any>;

  data: Data;
  data_array: Array<Data> = [];

  key: any;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage,
    private alertCtrl: AlertController, private ref: ChangeDetectorRef, ) {
    this.posts = null;
  }

  startMeasure() {
    this.http.get('http://192.168.4.1/s').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.ref.markForCheck();
    });
  }

  stopMeasure() {
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
              console.log(data.name);
              console.log("choose download")
              return this.setDownload();
            } else {
              console.log("invalid")
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  setDownload() {
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
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://xarlie32.pythonanywhere.com/connect').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.ref.markForCheck();
    });

    this.storage.forEach( (value, key, index) => {
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

  processKd() {

  }

}
