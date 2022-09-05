import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { Ruta } from '../../interfaces/admin.interfaces';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  rutas: Ruta[] = []
  loading: boolean = true;

  get user(){
    return {...this.adminService.user}
  }

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getAllRutaByAdmin()
      .subscribe(resp => {
        this.rutas = resp.rutas
        this.loading = false;
      })
  }

}
