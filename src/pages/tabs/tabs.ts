import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PlayPage } from '../play/play';
import { AboutPage } from '../about/about';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlayPage;

  constructor() {

  }
}
