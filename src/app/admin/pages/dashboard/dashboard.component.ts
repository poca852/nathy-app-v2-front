import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  rutas: Ruta[];

  get user() {
    return this.adminService.user
  }

  constructor(
    private adminService: AdminService,
    private messageService: MessageService
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
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ruta abierta', life: 2000 });
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
