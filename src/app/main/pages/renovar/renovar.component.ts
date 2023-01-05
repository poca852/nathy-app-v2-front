import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Cliente } from '../../../interfaces/main.interfaces';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.css'],
  providers: [MessageService]
})
export class RenovarComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  cliente: Cliente | null;
  hoy: string = moment().utc(true).format('DD/MM/YYYY');
  dialogoRenovar: boolean = false;
  creditoManual: FormControl = this.fb.control(false);
  optionsCredito: any[];

  creditoForm: FormGroup = this.fb.group({
    valor_credito: [null, [Validators.required, Validators.min(1)]],
    interes: [null, [Validators.required, Validators.min(0)]],
    total_cuotas: [null, [Validators.required, Validators.min(1)]],
    notas: [''],
    fecha_inicio: [this.hoy]
  })

  creditoManualForm: FormGroup = this.fb.group({
    valor_credito: [null, [Validators.required, Validators.min(1)]],
    total_cuotas: [null, [Validators.required, Validators.min(1)]],
    valor_cuota: [null, [Validators.required, Validators.min(1)]],
    notas: [''],
    fecha_inicio: [this.hoy]
  })

  constructor(
    private mainService: MainService,
    private router: Router,
    private aR: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.aR.params
      .pipe(
        switchMap(({ id }) => this.mainService.getCliente(id))
      )
      .subscribe(resp => {
        this.cliente = resp.cliente
        this.loading = false;
      })

    this.optionsCredito = [
      { label: 'Automatico', value: false },
      { label: 'Manual', value: true }
    ]

  }

  ngOnDestroy(): void {
    this.cliente = null;
    this.loading = false;
  }

  crearCredito() {
    this.loading = true;
    if (this.creditoForm.valid) {
      this.mainService.addCredito(this.creditoForm.value, this.cliente.id)
        .subscribe(resp => {
          console.log(resp)
          if (resp === true) {
            this.dialogoRenovar = false;
            this.messageService.add({
              severity: 'success',
              summary: 'SuccessFul',
              detail: 'Cliente renovado',
              life: 4000
            })
            this.router.navigateByUrl('/main/rutero')
            this.loading = false;
          } else {
            this.dialogoRenovar = false;
            this.messageService.add({
              severity: 'success',
              summary: 'SuccessFul',
              detail: resp.error,
              life: 4000
            })
            this.loading = false;
          }
        })
    }
  }

  addCreditoManual() {
    this.loading = true;
    if (this.creditoManualForm.valid) {
      this.mainService.addCreditoManual(this.creditoManualForm.value, this.cliente.id)
        .subscribe(resp => {
          if (resp) {
            console.log('Response ', resp)
            this.dialogoRenovar = false;
            this.messageService.add({
              severity: 'success',
              summary: 'SuccessFul',
              detail: 'Cliente renovado',
              life: 4000
            })
            this.router.navigateByUrl('/main/rutero')
            this.loading = false;
          } else {
            this.dialogoRenovar = false;
            this.messageService.add({
              severity: 'success',
              summary: 'SuccessFul',
              detail: resp.error,
              life: 4000
            })
            this.loading = false;
          }
        })
    }
  }

  confirmarRenovar(manual: boolean) {
    if (!manual) return this.crearCredito();

    return this.addCreditoManual();
  }
}