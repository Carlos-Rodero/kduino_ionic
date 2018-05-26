import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  itemSeleccionat: any;
  depth: any;
  depth_is_received: boolean = false;
  delete_is_received: boolean = false;
  data: any;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams,
    private alertCtrl: AlertController) {
    this.itemSeleccionat = navParams.get('item');
    console.log(this.itemSeleccionat);
  }

  depthForm() {
    console.log(this.depth);
    this.http.get('http://192.168.4.1/d?ip=' + this.itemSeleccionat.ip + '&depth=' + this.depth).
      map(res => res.json()).subscribe(data => {
        this.depth_is_received = true;
        this.data = data;
        console.log(data.info);
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailPage');
  }

  ping_device() {
    this.http.get('http://192.168.4.1/p?ip=' + this.itemSeleccionat.ip).map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

  delete_device() {

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
            this.http.get('http://192.168.4.1/e?ip=' + this.itemSeleccionat.ip).map(res => res.json()).subscribe(data => {
              this.delete_is_received = true;
              this.data = data;
              console.log(data.info);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
