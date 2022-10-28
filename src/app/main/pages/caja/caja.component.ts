import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../interfaces/main.interfaces';
import { MainService } from '../../../services/main.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
  providers: [MessageService]
})
export class CajaComponent implements OnInit {

  caja!: Caja;
  hoy: string = moment().utc(true).format('DD/MM/YYYY');
  loading: boolean = true;
  dialogoCerrar: boolean = false;

  get user() {
    return this.authService.user;
  }

  constructor(private mainService: MainService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.mainService.getCaja(this.user.ruta, this.hoy)
      .subscribe(resp => {
        this.caja = resp.caja;
        this.loading = false;
      })
  }

  cerrarRuta() {
    this.loading = true
    this.mainService.closeRuta(this.user.ruta, this.hoy)
      .subscribe(resp => {
        if (resp) {
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFul',
            detail: 'Ruta Cerrada',
            life: 3000
          })
          this.authService.logout();
          this.router.navigateByUrl('auth');
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
  }

  confirmCerrarRuta() {
    this.cerrarRuta()
  }

}
