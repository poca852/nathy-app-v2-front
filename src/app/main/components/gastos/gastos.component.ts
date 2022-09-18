import { Component, OnInit } from '@angular/core';
import { Gasto, ListaDeGastos, CrearGasto } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [ConfirmationService]
})
export class GastosComponent implements OnInit {

  gastos: ListaDeGastos[] = [];
  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required])
  gasto: FormControl = this.fb.control('', [Validators.required])
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  get user() {
    return this.authService.user;
  }

  constructor(private mainService: MainService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.mainService.getListaGastos()
      .subscribe(resp => {
        this.gastos = resp
      })

  }

  crearGasto() {
    this.loading = true;
    Swal.fire({
      title: 'Confrmación',
      text: "¿Esta seguro de agregar este gasto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let gasto: CrearGasto = {
          fecha: this.fecha,
          valor: this.valor.value,
          gasto: this.gasto.value,
          idRuta: this.user.ruta,
          nota: this.nota.value
        }
        this.mainService.addGasto(gasto)
          .subscribe(resp => {
            if (resp === true) {
              Swal.fire('Success', 'Gasto agregado correctamente', 'success')
              this.router.navigateByUrl('/main/caja')
              this.loading = false
            } else {
              Swal.fire('Error', resp.error.errors.valor.msg, 'error')
              this.loading = false
            }
          })
      } else {
        this.loading = false

      }
    })

  }
}
