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

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

}
