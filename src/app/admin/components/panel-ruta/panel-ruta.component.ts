import { Component, OnInit, Input } from '@angular/core';
import { Ruta } from '../../interfaces/admin.interfaces';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-panel-ruta',
  templateUrl: './panel-ruta.component.html',
  styleUrls: ['./panel-ruta.component.css']
})
export class PanelRutaComponent implements OnInit {

  @Input() ruta: Ruta;

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
    this.adminService.openRuta(this.ruta.id)
      .subscribe(resp => {
        if(resp.ok === true){
          window.location.reload()
        }
      })
  }

}
