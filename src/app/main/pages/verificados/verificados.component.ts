import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Credito, Pago } from '../../interfaces/main.interfaces';
import * as moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';

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

  get user(){
    return this.authService.user;
  }

  constructor(
    private mainService: MainService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true
    this.mainService.getAllPagos(this.user.ruta, this.hoy)
      .subscribe(resp => {
        this.loading = false;
        this.pagos = resp.pagos
      })
  }

}
