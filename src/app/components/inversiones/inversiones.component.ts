import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
import { CrearInversion } from '../../interfaces/main.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css'],
  providers: [MessageService]
})
export class InversionesComponent implements OnInit {

  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)])
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  dialogoConfirmInversion: boolean = false;

  get user() {
    return this.authService.user;
  }

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  crearInversion() {
    this.loading = true;
    let inversion: CrearInversion = {
      fecha: this.fecha,
      valor: this.valor.value,
      nota: this.nota.value,
      idRuta: this.user.ruta
    }

    this.mainService.addInversion(inversion)
      .subscribe(resp => {
        if (resp === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFul',
            detail: 'Inversion agregada',
            life: 2000
          })
          this.dialogoConfirmInversion = false;
          this.loading = false;
          this.router.navigateByUrl('/main/caja')
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error.errors.valor.msg,
            life: 2000
          })
          this.dialogoConfirmInversion = false;
          this.loading = false;
        }
      })

  }

  confirmarInversion() {
    this.crearInversion()
  }
}
