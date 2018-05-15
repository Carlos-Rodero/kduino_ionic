import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  posts: any;

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
    this.http.get('http://192.168.4.1/r').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deleteMeasure() {
    this.http.get('http://192.168.4.1/e').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    });
  }

}
