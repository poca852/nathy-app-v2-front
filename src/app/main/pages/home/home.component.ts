import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

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
  constructor( private authService: AuthService,
                private router: Router ) { }

  ngOnInit(): void {

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
