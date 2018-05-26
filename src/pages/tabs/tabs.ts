import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PlayPage } from '../play/play';
import { StatsPage } from '../stats/stats';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlayPage;
  tab3Root = StatsPage

  constructor() {

  }
}
