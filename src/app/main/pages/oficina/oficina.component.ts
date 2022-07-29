import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styles: [
    `.main{
      margin-top: 60px;
    }
    .active{
      color: yellow;
    }
    `
  ]
})
export class OficinaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
