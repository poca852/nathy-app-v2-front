import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { CrearRetiro } from '../../interfaces/main.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css'],
})
export class RetirosComponent implements OnInit {

  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)]);
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  get user() {
    return this.authService.user;
  }

  constructor(private fb: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  crearRetiro() {
    this.loading = true
    Swal.fire({
      title: 'Confirmación',
      text: "¿Estas seguro de hacer este retiro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let retiro: CrearRetiro = {
          valor: this.valor.value,
          fecha: this.fecha,
          nota: this.nota.value,
          idRuta: this.user.ruta
        }
        this.mainService.addRetiro(retiro)
          .subscribe(resp => {
            if (resp === true) {
              Swal.fire('Success', 'Retiro agregado correctamente', 'success')
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
