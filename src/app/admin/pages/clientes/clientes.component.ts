import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from '../../interfaces/admin.interfaces';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @Input() ruta: Ruta;


  constructor() { }

  ngOnInit(): void {
  }

}
