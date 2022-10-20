import { Component, OnInit } from '@angular/core';
import { Cliente, Ruta, User } from 'src/app/interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  admin: User;
  selectorDeRuta: FormControl = this.fb.control('')
  rutaSeleccionada: Ruta;
  clientes: Cliente[];

  constructor(
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.admin = this.adminService.user
    // this.selectorDeRuta.reset(this.adminService.user.rutas[0]._id)
  }

  seleccionarRuta(e: any){
    this.rutaSeleccionada = null;
    this.clientes = [];
    this.rutaSeleccionada = this.admin.rutas.find(ruta => ruta._id === e.value)
    this.adminService.getClientes(true, e.value)
      .subscribe(resp => this.clientes = resp.clientes)

  }

}
