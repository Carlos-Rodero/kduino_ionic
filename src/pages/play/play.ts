import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Data } from '../../app/data';


import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {
  posts: any;
  data_received: any;
  data_received_pretty: any;
  data_split_array: Array<any>;

  data: Data;
  data_array: Array<Data> = [];

  key: any;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage) {
    this.posts = null;
  }

  startMeasure() {
    this.http.get('http://192.168.4.1/s').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  stopMeasure() {
    this.http.get('http://192.168.4.1/x').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  readMeasure() {
    this.http.get('http://192.168.4.1/r').map(res => res.text()).subscribe(data => {
      this.data_received = data;
      this.processData();
      //this.data_received_pretty = JSON.stringify(this.data_array,null, 2);
      this.data_array.forEach((item, index) => {
        if (index == 0){
          this.key = item.timestamp;
          this.storage.set(item.timestamp, this.data_array);
        }
      });
    });
  }

  deleteMeasure() {
    this.http.get('http://192.168.4.1/e').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  uploadMeasure() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://xarlie32.pythonanywhere.com/connect').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });

    this.storage.get(this.key).then((val) => {
      console.log('Your json is', val);
      var data_json = JSON.stringify(val);
      console.log(data_json);
      this.http.post('http://xarlie32.pythonanywhere.com/api/data/1', data_json,
      { headers: headers }).map(res => res.json()).subscribe(data => {
        this.posts = data;
        console.log(this.posts);
      });
    });
  }

  processData() {
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
        this.data.ip = item.slice(pos + 1);
      }
      if (item.indexOf("END") !== -1) {
        this.data_array.push(this.data);
        return;
      }
      if (is_metadata) {
        if (count == 1) {
          this.data.mac = item;
        }
        if (count == 2) {
          this.data.measurement_time = item;
        }
        if (count == 3) {
          this.data.depth = item;
        }
        if (count == 4) {
          this.data.timestamp = item;
        }
        if (count == 5) {
          this.data.latitude = item;
        }
        if (count == 6) {
          this.data.longitude = item;
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
          this.data.values = values;
        }
      }
      if ((count !== 0) && (count % 6 == 0)) {
        count = -1;
        is_metadata = false;
      }
      count++;
    });
    /*this.data_array.forEach((item, index) => {
      console.log(item.depth);
    });*/
  }
}
