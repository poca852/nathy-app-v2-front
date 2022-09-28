import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Pago, ActualizarPago } from '../../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aditar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css'],
})
export class EditarPagoComponent implements OnInit {

  pago!: Pago;
  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(1)]);
  loading: boolean = false;
  fecha: string = moment().utc(true).format('DD/MM/YYYY hh:mm a')

  constructor(
    private mainService: MainService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.mainService.getPago(id)),
      )
      .subscribe(resp => {
        this.pago = resp.pago
      })

  }

  pagar() {
    this.loading = true;
    Swal.fire({
      title: 'Confirmación',
      text: "¿Esta seguro de actualizar este pago?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let pago: ActualizarPago = {
          cliente: this.pago.cliente._id,
          credito: this.pago.credito._id,
          fecha: this.fecha,
          idPago: this.pago.id,
          ruta: this.pago.ruta,
          valor: this.valor.value
        }
        this.mainService.updatePago(pago)
          .subscribe(resp => {
            if (resp === true) {
              Swal.fire('Success', 'Pago actualizado correctamente', 'success')
              this.router.navigateByUrl('/main/verificados')
              this.loading = false
            }else{
              console.log(resp)
              Swal.fire('Error', resp.error.errors.valor.msg, 'error');
              this.loading = false;
            }
          })
      } else {
        this.loading = false;
      }
    })

  }

}
