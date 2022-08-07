import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Credito } from '../../interfaces/main.interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-verificados',
  templateUrl: './verificados.component.html',
  styleUrls: ['./verificados.component.css']
})
export class VerificadosComponent implements OnInit {

  creditos: Credito[] = [];
  hoy: string = moment().utc(true).format('DD/MM/YYYY');

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getCreditos()
      .subscribe(resp => {
        this.creditos = this.creditosVerificados(resp.creditos);
      })
  }

  creditosVerificados(creditos: Credito[]): Credito[] {
    let arr: Credito[] = []
    creditos.forEach(credito => {
      if(credito.ultimo_pago.includes(this.hoy)){
        arr.unshift(credito)
      }
    })

    return arr;
  }

  buscar(eve: any){
    
  }

  sugerencias(eve: any){}

}
