import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  posts: any;
  data: any;

  data_array: Array<any>;
  data_new: {};

  constructor(public navCtrl: NavController, public http: Http) {
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
      this.data = data;
      console.log(this.data);
      this.processData();
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

    this.http.post('http://xarlie32.pythonanywhere.com/api/data/1', {"prova":"json desde ionic"},  
    {headers: headers}).map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  processData() {
    var data_array = [];
    var data_station_dict = {};
    var values = [];
    var is_metadata = false;  
    var count = 0;
    var count_station = 0;
    this.data_array = this.data.split(",");
    this.data_array.forEach((item, index) => {
      if (item.indexOf("$") !== -1){
        is_metadata = true;
        count_station++;
        count = 0;
        var ip = {"ip" : item};
      }
      if (is_metadata) {
        if (count == 1){
          var mac = {"mac": item};
        }
        if (count == 2){
          var time = {"measurement_time" : item};
        }
        if (count == 3){
          var depth = {"depth" : item};
        }
        if (count == 4){
          var timeStamp = {"timeStamp" : item};
        }
        if (count == 5){
          var latitude = {"latitude" : item};
        }
        if (count == 6){
          var longitude = {"longitude" : item};
        }
      } else {
        if (count == 0){
          values.push({"count": item});
        }
        if (count == 1){
          values.push({"temp": item});
        }
        if (count == 2){
          values.push({"lux": item});
        }
        if (count == 3){
          values.push({"red": item});
        }
        if (count == 4){
          values.push({"green": item});
        }
        if (count == 5){
          values.push({"blue": item});
        }
        if (count == 6){
          values.push({"clear": item});
        }
      }
      if (count % 6){
        count = 0;
        is_metadata = false;
        var data = {"data" : values};
        data_station_dict[count_station] = Object.assign({}, ip, mac, time, depth, timeStamp, latitude, longitude, data);
      }
      count++;
  });
    data_array.push(data_station_dict);
    console.log(data_array);
  }
}
