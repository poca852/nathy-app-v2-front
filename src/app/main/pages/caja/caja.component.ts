import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../interfaces/main.interfaces';
import { MainService } from '../../../services/main.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {

  caja!: Caja;
  hoy: string = moment().utc(true).format('DD/MM/YYYY');
  loading: boolean = true;

  get user() {
    return this.authService.user;
  }

  constructor(private mainService: MainService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.mainService.getCaja(this.user.ruta, this.hoy)
      .subscribe(resp => {
        this.caja = resp.caja;
        this.loading = false;
      })
  }

  cerrarRuta() {
    this.loading = true
    Swal.fire({
      title: 'Estas a punto de cerrar la ruta',
      text: "Esta acción ya no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mainService.closeRuta(this.user.ruta, this.hoy)
          .subscribe(resp => {
            if (resp) {
              this.authService.logout();
              Swal.fire('Success', 'Ruta Cerrada', 'success')
              this.router.navigateByUrl('auth');
              this.loading = false;
            } else {
              this.loading = false;
            }
          })
      } else {
        this.loading = false;
      }
    })
  }

}
