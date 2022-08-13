import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from '../../../main/interfaces/main.interfaces';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  @Input() rutaActiva: Ruta;

  constructor() { }

  ngOnInit(): void {
  }

}
