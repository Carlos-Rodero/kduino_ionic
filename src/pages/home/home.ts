import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  posts: any;
  error: boolean = false;
  errorMsg: string = "Connection error";

  constructor(public navCtrl: NavController, public http: Http, private ref: ChangeDetectorRef) {

    this.posts = null;
    this.error = false;

    this.http.get('http://192.168.4.1/c').map(res => res.json()).catch((err) => {
      this.error = true;
      return Observable.throw(this.errorMsg)})
      .subscribe(data => {
      this.error = false;
      this.posts = data.station;
      this.ref.markForCheck();
      console.log(this.posts);
      });
  }

  refresh_devices() {
    this.http.get('http://192.168.4.1/c').map(res => res.json()).catch((err) => {
      this.error = true;
      return Observable.throw(this.errorMsg)})
      .subscribe(data => {
      this.error = false;
      this.posts = data.station;
      this.ref.markForCheck();
      console.log(this.posts);
      });
  }
}
