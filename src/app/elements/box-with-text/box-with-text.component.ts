import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-with-text',
  template: `
    <p>
      box-with-text works!
    </p>
  `,
  styleUrls: ['./box-with-text.component.css']
})
export class BoxWithTextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
