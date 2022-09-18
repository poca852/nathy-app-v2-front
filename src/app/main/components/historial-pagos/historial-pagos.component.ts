import { Component, Input, OnInit } from '@angular/core';
import { Pago, GetAllPagos } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import * as moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css']
})
export class HistorialPagosComponent implements OnInit {

  @Input() idCliente: string = '';
  @Input() idCredito: string = '';
  pagos: Pago[] = []
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  get user(){
    return this.authService.user;
  }

  constructor(
    private mainService: MainService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.mainService.getPagos(this.idCliente, this.idCredito)
      .subscribe(resp => {
        if(resp.ok){
          this.pagos = resp.pagos
        }
      })
  }

}
