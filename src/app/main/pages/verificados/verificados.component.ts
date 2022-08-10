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
  loading: boolean = false;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.loading = true
    this.mainService.getAllPagos()
      .subscribe(resp => {
        this.loading = false;
        this.pagos = resp.pagos
      })
  }

}
