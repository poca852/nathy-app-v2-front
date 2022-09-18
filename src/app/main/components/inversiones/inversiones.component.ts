import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import * as moment from 'moment';
import { CrearInversion } from '../../interfaces/main.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css'],
})
export class InversionesComponent implements OnInit {

  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)])
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  get user() {
    return this.authService.user;
  }

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  crearInversion() {
    this.loading = true;
    Swal.fire({
      title: 'Confirmar?',
      text: `¿Estas seguro de ingresar esta inversion?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let inversion: CrearInversion = {
          fecha: this.fecha,
          valor: this.valor.value,
          nota: this.nota.value,
          idRuta: this.user.ruta
        }
        this.mainService.addInversion(inversion)
          .subscribe(resp => {
            if (resp === true) {
              Swal.fire('Success', 'Inversion agregada correctamente', 'success')
              this.router.navigateByUrl('/main/caja')
              this.loading = false;
            }else{
              Swal.fire('Error', resp.error.errors.valor.msg, 'error')
              this.loading = false;
            }
          })
      } else {
        this.loading = false;
      }
    })

  }
}
