import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rutas: Ruta[];

  get user() {
    return this.adminService.user
  }

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getRutas()
  }

  openRuta(ruta: string){
    const fecha = moment().utc(true).format('DD/MM/YYYY');
    this.adminService.openRuta(ruta, fecha)
      .subscribe(resp => {
        if(resp){
          this.getRutas()
          Swal.fire('Success', 'Ruta Abierta', 'success')
        }
      })
  }

  getRutas(){
    this.adminService.getAllRutaByAdmin()
      .subscribe(resp => {
        this.rutas = resp.rutas
      })
  }

}
