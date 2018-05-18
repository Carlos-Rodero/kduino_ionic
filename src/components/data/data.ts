import { Component } from '@angular/core';

@Component({
  selector: 'data',
  templateUrl: 'data.html'
})
export class DataComponent {

  text: string;

  constructor() {
    console.log('Hello DataComponent Component');
    this.text = 'Hello World';
  }

}
