import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Credito, Pago } from '../../interfaces/main.interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-verificados',
  templateUrl: './verificados.component.html',
  styleUrls: ['./verificados.component.css']
})
export class VerificadosComponent implements OnInit {

  // creditos: Credito[] = [];
  pagos: Pago[] = [];
  hoy: string = moment().utc(true).format('DD/MM/YYYY');

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getAllPagos()
      .subscribe(resp => {
        this.pagos = resp.pagos
      })
  }


  buscar(eve: any){
    
  }

  sugerencias(eve: any){}

}
