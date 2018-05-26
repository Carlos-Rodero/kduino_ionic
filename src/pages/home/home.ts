import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

import { DetailPage } from '../detail/detail';

import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  MAC: string = "5CCF7F";
  posts: any;

  date: any;
  timeStamp: any;

  data_time: any;
  data_position: any;

  is_connected: boolean;
  is_received_time: boolean = false;
  is_received_position: boolean = false;
  errorMsg: string = "Connection error";

  constructor(public navCtrl: NavController, public http: Http, private ref: ChangeDetectorRef,
    private alertCtrl: AlertController, private geolocation: Geolocation, private storage: Storage) {

    this.posts = null;
    this.is_connected = false;


    this.http.get('http://192.168.4.1/c').map(res => res.json()).catch((err) => {
      this.is_connected = false;
      return Observable.throw(this.errorMsg)
    })
      .subscribe(data => {
        this.is_connected = true;
        this.posts = data.station;
        this.filterDocument(this.MAC);
        this.ref.markForCheck();
        console.log(this.posts);
      });
  }

  filterDocument(doc) {
    this.posts = this.posts.filter(
      post => post.mac.indexOf(doc) == 0);
  }

  setTimestamp() {
    this.date = new Date();
    this.timeStamp = this.date.getFullYear() + "/" + this.getMonth() + "/" +
      this.date.getDate() + "-" + this.date.getHours() + ":" + this.getMinutes() +
      ":" + this.getSeconds();
  }

  getMonth() {
    if (this.date.getMonth() < 10) {
      return "0" + (this.date.getMonth() + 1);
    } else {
      return (this.date.getMonth() + 1);
    }
  }

  getMinutes() {
    if (this.date.getMinutes() < 10) {
      return "0" + (this.date.getMinutes());
    } else {
      return (this.date.getMinutes());
    }
  }

  getSeconds() {
    if (this.date.getSeconds() < 10) {
      return "0" + (this.date.getSeconds());
    } else {
      return (this.date.getSeconds());
    }
  }

  refresh_devices() {
    this.http.get('http://192.168.4.1/c').map(res => res.json()).catch((err) => {
      this.is_connected = false;
      return Observable.throw(this.errorMsg)
    })
      .subscribe(data => {
        this.is_connected = true;
        this.posts = data.station;
        this.filterDocument(this.MAC);
        this.ref.markForCheck();
        console.log(this.posts);
      });
  }

  ping_devices() {
    this.http.get('http://192.168.4.1/p').map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

  itemClicked(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  measurement_time_devices() {
    let alert = this.alertCtrl.create({
      title: 'Set Measurement Time',
      inputs: [
        {
          type: "number",
          name: 'time',
          placeholder: 'seconds'
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
            if (data.time) {
              console.log(data.time);
              this.http.get('http://192.168.4.1/t?' + data.time).map(res => res.json()).subscribe(data => {
                this.data_time = data;
                console.log(data);
                this.is_received_time = true;
                this.ref.markForCheck();
              });
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

  position_devices() {
    let alert = this.alertCtrl.create({
      title: 'Set Position',
      inputs: [
        {
          type: 'radio',
          label: 'gps',
          value: 'gps'
        },
        {
          type: 'radio',
          label: 'manual',
          value: 'manual'
        }],
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
            this.setTimestamp();
            console.log(this.timeStamp)
            if (data == "gps") {
              this.geolocation.getCurrentPosition().then((resp) => {
                this.http.get('http://192.168.4.1/m?timeStamp=' + this.timeStamp + '&latitude=' +
                  resp.coords.latitude + '&longitude=' + resp.coords.longitude).map(res => res.json()).
                  subscribe(data => {
                    this.data_position = data;
                    this.is_received_position = true;
                    this.ref.markForCheck();
                  });
                console.log(resp.coords.latitude);
                console.log(resp.coords.longitude);
              }).catch((error) => {
                console.log('Error getting location', error);
              });

            } if (data == "manual") {
              console.log("fer manual")
              return this.manual_position_devices();
            }
          }
        }
      ]
    });
    alert.present();
  }

  manual_position_devices() {
    let alert = this.alertCtrl.create({
      title: 'Set Manual Position',
      inputs: [
        {
          name: 'latitude',
          placeholder: 'latitude'
        },
        {
          name: 'longitude',
          placeholder: 'longitude'
        }],
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
            this.date = new Date();
            this.setTimestamp();
            if (data.latitude && data.longitude) {
              this.http.get('http://192.168.4.1/m?timeStamp=' + this.timeStamp + '&latitude=' +
                data.latitude + '&longitude=' + data.longitude).map(res => res.json()).
                subscribe(data => {
                  this.data_position = data;
                  this.is_received_position = true;
                  this.ref.markForCheck();
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  delete_app() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete data saved in this mobile?',
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
            this.storage.forEach((value, key, index) => {
              this.storage.clear();
            })
          }
        }
      ]
    });
    alert.present();
  }
}
