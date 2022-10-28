import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Pago, ActualizarPago } from '../../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aditar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css'],
  providers: [MessageService]
})
export class EditarPagoComponent implements OnInit {

  pago!: Pago;
  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(1)]);
  loading: boolean = false;
  fecha: string = moment().utc(true).format('DD/MM/YYYY hh:mm a')
  digalogConfirm: boolean = false;

  constructor(
    private mainService: MainService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
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
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pago actualizado', life: 3000 })
          this.digalogConfirm = false;
          this.router.navigateByUrl('/main/verificados')
          this.loading = false;
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: resp.error.errors.valor.msg, life: 3000})
          this.digalogConfirm = false;
          this.loading = false;
        }
      })

  }

  confirmActualizar() {
    this.pagar()
  }

}
