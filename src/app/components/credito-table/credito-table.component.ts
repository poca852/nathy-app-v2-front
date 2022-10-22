import { Component, Input, OnInit } from '@angular/core';
import { Cliente, Credito } from '../../interfaces/main.interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-credito-table',
  templateUrl: './credito-table.component.html',
  styleUrls: ['./credito-table.component.css']
})
export class CreditoTableComponent implements OnInit {
  
  @Input() creditos: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.creditos.map(credito => {
      credito.pagos = credito.pagos.map(pago => {
        const fecha = moment(pago.fecha)
        console.log(fecha)
        // pago.fecha = new Date(fecha)
      })
    })
    console.log(this.creditos)
  }

}
