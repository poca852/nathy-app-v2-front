import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from '../../interfaces/admin.interfaces';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-resumen-ruta',
  templateUrl: './resumen-ruta.component.html',
  styleUrls: ['./resumen-ruta.component.css']
})
export class ResumenRutaComponent implements OnInit {

  @Input() ruta: Ruta;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  closeRuta(status: boolean){

    if(status){
      this.adminService.closeRuta(this.ruta.id)
        .subscribe(resp => window.location.reload())
    }else{
      this.adminService.openRuta(this.ruta.id)
        .subscribe(resp => window.location.reload())
    }
  }

}
