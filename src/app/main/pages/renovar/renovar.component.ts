import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Cliente } from '../../../interfaces/main.interfaces';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.css'],
})
export class RenovarComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  cliente: Cliente | null;
  hoy: string = moment().utc(true).format('DD/MM/YYYY');

  creditoForm: FormGroup = this.fb.group({
    valor_credito: [null, [Validators.required, Validators.min(1)]],
    interes: [null, [Validators.required, Validators.min(0)]],
    total_cuotas: [null, [Validators.required, Validators.min(1)]],
    notas: [''],
    idRuta: ['', Validators.required],
    idCliente: ['', Validators.required],
    fecha: ['', Validators.required]
  })

  constructor(
    private mainService: MainService,
    private router: Router,
    private aR: ActivatedRoute,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.aR.params
      .pipe(
        switchMap(({ id }) => this.mainService.getCliente(id))
      )
      .subscribe(resp => {

        this.cliente = resp.cliente

        this.creditoForm.reset({
          idRuta: resp.cliente.ruta,
          idCliente: resp.cliente.id,
          fecha: this.hoy
        })
        this.loading = false;
      })

  }

  ngOnDestroy(): void {
    this.cliente = null;
    this.loading = false;
  }

  crearCredito() {
    this.loading = true;
    Swal.fire({
      title: `Estas renovando a ${this.cliente.nombre}`,
      text: "Estas seguro que los datos estan correctos?, revertir esto es complicado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.creditoForm.valid) {
          this.mainService.addCredito(this.creditoForm.value)
            .subscribe(resp => {
              if (resp === true) {
                Swal.fire('Success', 'Cliente renovado correctamente', 'success')
                this.router.navigateByUrl('/main/rutero')
                this.loading = false;
              } else {
                console.log(resp)
                Swal.fire('Error', resp.error, 'error');
                this.loading = false;
              }
            })
        }
      } else {
        this.loading = false;
      }
    })
  }
}