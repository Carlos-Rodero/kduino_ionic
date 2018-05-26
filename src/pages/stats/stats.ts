import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
  my_url: any;
  is_connected: boolean = false;

  constructor(private sanitize: DomSanitizer, public http: Http) { 

  }

  ionViewDidLoad() {
    this.connect();
  }

  urlpaste() {
    this.my_url = "http://xarlie32.pythonanywhere.com";
    return this.sanitize.bypassSecurityTrustResourceUrl(this.my_url);
  }

  connect() {
    this.http.get('http://xarlie32.pythonanywhere.com/connect').map(res => res.json()).catch((err) => {
      this.is_connected = false;
      return Observable.throw(err)
    })
      .subscribe(data => {
        this.is_connected = true;
        //this.ref.markForCheck();
      });
  }
}


