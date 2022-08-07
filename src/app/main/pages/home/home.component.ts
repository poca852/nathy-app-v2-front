import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/auth.interface';
import { Ruta } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';

interface Menu {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu!: boolean;
  itemsMenu: Menu[] = []
  ruta: Ruta;

  get user(){
    return this.authService.user;
  }

  constructor( private authService: AuthService,
                private router: Router,
                private mainService: MainService ) { }

  ngOnInit(): void {

    this.mainService.getRuta(this.user.ruta)
      .subscribe(resp => this.ruta = resp.ruta);

    this.itemsMenu = [
      {
        ruta: '/main/rutero',
        nombre: 'Rutero'
      },
      {
        ruta: '/main/verificados',
        nombre: 'Verificados'
      },
      {
        ruta: '/main/renovaciones',
        nombre: 'Renovaciones'
      },
      {
        ruta: '/main/cliente-nuevo',
        nombre: 'Cliente Nuevo'
      },
      {
        ruta: '/main/oficina',
        nombre: 'Oficina'
      },
      {
        ruta: '/main/caja',
        nombre: 'Caja'
      }
    ]
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/auth')
  }

}
