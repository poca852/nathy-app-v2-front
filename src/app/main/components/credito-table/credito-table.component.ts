import { Component, Input, OnInit } from '@angular/core';
import { Credito } from '../../interfaces/main.interfaces';

@Component({
  selector: 'app-credito-table',
  templateUrl: './credito-table.component.html',
  styleUrls: ['./credito-table.component.css']
})
export class CreditoTableComponent implements OnInit {
  
  @Input() creditos: Credito[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
