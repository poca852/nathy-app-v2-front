import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Cliente } from '../../interfaces/main.interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.css'],
  providers: [ConfirmationService]
})
export class RenovarComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  cliente: Cliente | null;

  creditoForm: FormGroup = this.fb.group({
    valor_credito: [null, [Validators.required, Validators.min(1)]],
    interes: [null, [Validators.required, Validators.min(0)]],
    total_cuotas: [null, [Validators.required, Validators.min(1)]]
  })

  constructor(private mainService: MainService,
    private router: Router,
    private aR: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.aR.params
      .pipe(
        switchMap(({ id }) => this.mainService.getCliente(id))
      )
      .subscribe(resp => this.cliente = resp.cliente)
  }

  ngOnDestroy(): void {
    this.cliente = null;
    this.loading = false;
  }

  crearCredito() {
    if (this.creditoForm.valid) {
      this.mainService.addCredito(
        this.cliente.id,
        this.creditoForm.get('valor_credito').value,
        this.creditoForm.get('interes').value,
        this.creditoForm.get('total_cuotas').value)
        .subscribe(resp => {
          if (resp === true) {
            this.router.navigateByUrl('/main/rutero')
          } else {
            console.log(resp)
          }
        })
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.crearCredito()
      }
    });
  }
}