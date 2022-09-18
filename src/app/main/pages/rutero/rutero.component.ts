import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Credito, Cliente } from '../../interfaces/main.interfaces';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-rutero',
  templateUrl: './rutero.component.html',
  styleUrls: ['./rutero.component.css']
})
export class RuteroComponent implements OnInit {

  // termino: string = '';
  hayError: boolean = false;
  creditos: Credito[] = [];
  hoy: string = moment().utc(true).format('DD/MM/YYYY');
  loading: boolean = false;

  get user() {
    return this.authService.user;
  }

  constructor(private mainService: MainService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.mainService.getCreditos(true, this.user.ruta)
      .subscribe(resp => {
        this.creditos = this.creditosVerificados(resp.creditos);
        this.loading = false
      })
  }

  creditosVerificados(creditos: Credito[]): Credito[] {
    let arr: Credito[] = []
    creditos.forEach(credito => {
      if (!credito.ultimo_pago?.includes(this.hoy)) {
        arr.unshift(credito)
      } else if (!credito.ultimo_pago) {
        arr.unshift(credito)
      }
    })

    return arr;
  }

  goTo(ruta: string) {
    this.router.navigateByUrl(`/main/${ruta}`)
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mainService.getCreditoByName(termino)
      .subscribe(resp => {
        if (resp.results.length > 0) {
          this.creditos = this.creditosVerificados(resp.results)
        } else {
          this.creditos = []
          this.hayError = true
        }
      })
  }

}
