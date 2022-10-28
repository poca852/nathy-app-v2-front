import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { CrearRetiro } from '../../interfaces/main.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css'],
  providers: [MessageService]
})
export class RetirosComponent implements OnInit {

  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)]);
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  dialogoRetiro: boolean = false;

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

  crearRetiro() {
    this.loading = true;
    let retiro: CrearRetiro = {
      valor: this.valor.value,
      fecha: this.fecha,
      nota: this.nota.value,
      idRuta: this.user.ruta
    }

    this.mainService.addRetiro(retiro)
      .subscribe(resp => {
        if (resp === true) {
          this.dialogoRetiro = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Retiro agregado correctamente',
            life: 2000
          })
          this.router.navigateByUrl('/main/caja')
          this.loading = false;
        } else {
          this.dialogoRetiro = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error.errors.valor.msg,
            life: 2000
          })
          this.loading = false;
        }
      })
  }

  confirmarRetiro() {
    this.crearRetiro()
  }


}
