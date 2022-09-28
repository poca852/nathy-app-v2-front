import { Component, OnInit, Input } from '@angular/core';
import { Ruta } from '../../../interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-panel-ruta',
  templateUrl: './panel-ruta.component.html',
  styleUrls: ['./panel-ruta.component.css']
})
export class PanelRutaComponent implements OnInit {

  @Input() ruta: Ruta;
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  closeRuta(){
    this.adminService.closeRuta(this.ruta.id)
      .subscribe(resp => {
        if(resp.ok === true){
          window.location.reload()
        }
      })
  }

  openRuta(){
    this.adminService.openRuta(this.ruta._id, this.fecha)
      .subscribe(resp => {
        if(resp.ok === true){
          window.location.reload()
        }
      })
  }

}
