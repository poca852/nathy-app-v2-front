import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Cliente, Credito } from '../../../interfaces/main.interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-renovaciones',
  templateUrl: './renovaciones.component.html',
  styles: []
})
export class RenovacionesComponent implements OnInit {

  clientes!: Cliente[];

  get user(){
    return this.authService.user;
  }

  constructor(
    private mainService: MainService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.mainService.getClientes(false, this.user.ruta)
      .subscribe(resp => {
        this.clientes = resp.clientes
      })
  }

}
