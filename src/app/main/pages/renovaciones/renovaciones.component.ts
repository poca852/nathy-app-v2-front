import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Credito } from '../../interfaces/main.interfaces';

interface Cliente {
  id: string;
  status: boolean;
  state: boolean;
  dpi: string;
  nombre: string;
  alias: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  img?: string;
  ruta: string;
  creditos: Credito[]
}

@Component({
  selector: 'app-renovaciones',
  templateUrl: './renovaciones.component.html',
  styles: [
    `.main{
      margin-top: 60px;
    }`
  ]
})
export class RenovacionesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getClientes(false)
      .subscribe(resp => {
        this.clientes = resp.clientes
      })
  }

}
