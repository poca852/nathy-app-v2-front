import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credito-table',
  templateUrl: './credito-table.component.html',
  styleUrls: ['./credito-table.component.css']
})
export class CreditoTableComponent implements OnInit {
  
  @Input() creditos: any[] = []

  constructor() { }

  ngOnInit(): void {}

}
