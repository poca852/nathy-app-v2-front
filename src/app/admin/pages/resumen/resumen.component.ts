import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Ruta } from '../../interfaces/admin.interfaces';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  rutas: Ruta[] = []
  loading: boolean = false;
  openMenu: boolean = false

  get user(){
    return {...this.adminService.user}
  }

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.adminService.getRutas()
      .subscribe(({rutas}) => this.rutas = rutas)
  }

}
