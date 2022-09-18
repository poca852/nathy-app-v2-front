import { Component, Input, OnInit } from '@angular/core';
import { Credito, CrearPagoInterface } from '../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pago-variable',
  templateUrl: './pago-variable.component.html',
  styleUrls: ['./pago-variable.component.css']
})
export class PagoVariableComponent implements OnInit {

  @Input() credito!: Credito

  pago: FormControl = this.fb.control(null, [Validators.required, Validators.min(1)]);
  loading: boolean = false;
  hoy: string = moment().utc(true).format('DD/MM/YYYY hh:mm a')

  constructor(private fb: FormBuilder,
    private mainService: MainService,
    private router: Router) { }

  ngOnInit(): void {
    // this.pago.reset(0);
  }

  pagar() {
    if (this.pago.valid) {
      this.loading = true;
      let pago: CrearPagoInterface = {
        valor: this.pago.value,
        fecha: this.hoy,
        idCredito: this.credito.id,
        idRuta: this.credito.ruta
      }
      this.mainService.addPago(pago)
        .subscribe(resp => {
          if (resp.ok) {
            this.router.navigateByUrl('/main')
            this.loading = false
          }
          this.loading = false
        })
    }
  }

}
