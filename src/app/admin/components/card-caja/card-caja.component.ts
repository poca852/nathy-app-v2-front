import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Caja } from '../../../interfaces/main.interfaces';

@Component({
  selector: 'app-card-caja',
  templateUrl: './card-caja.component.html',
  styleUrls: ['./card-caja.component.scss']
})
export class CardCajaComponent implements OnInit, OnChanges {

  @Input() cajas: Caja[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.cajas)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cajas = changes['cajas'].currentValue
  }

}
