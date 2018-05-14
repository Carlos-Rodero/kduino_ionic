import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;

  constructor(public navCtrl: NavController, public http: Http) {

    this.posts = null;
 
    this.http.get('http://192.168.4.1/c').map(res => res.json()).subscribe(data => {
        this.posts = data.station;
        console.log(this.posts);
  });

  }

}
