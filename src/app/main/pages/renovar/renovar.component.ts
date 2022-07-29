import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

interface Cliente {
  valor_credito: number;
  interes: number;
  total_cuotas: number;
  total_pagar: number;
  abonos: number;
  saldo: number;
  valor_cuota: number;
  fecha_inicio: string;
  cliente: string;
  ultimo_pago: string;
}

@Component({
  selector: 'app-renovar',
  templateUrl: './renovar.component.html',
  styleUrls: ['./renovar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RenovarComponent implements OnInit {

  idCliente: string = ''
  position: string = '';

  creditoForm: FormGroup = this.fb.group({
    valor_credito: [500, [Validators.required, Validators.min(0)]],
    interes: [20, [Validators.required, Validators.min(0)]],
    total_cuotas: [20, [Validators.required, Validators.min(0)]],
    saldo: []
  })

  // messageService: any;
  
  

  constructor(private mainService: MainService,
              private router: Router,
              private aR: ActivatedRoute,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.aR.params
      .subscribe(({id}) => this.idCliente = id)
  }

  crearCredito() {
    const cliente: Cliente = {
      valor_credito: this.creditoForm.get('valor_credito')?.value,
      interes: this.creditoForm.get('interes')?.value,
      total_cuotas: this.creditoForm.get('total_cuotas')?.value,
      abonos: 0,
      total_pagar: this.getTotalCredito(this.creditoForm.get('valor_credito')?.value, this.creditoForm.get('interes')?.value),
  
      saldo: this.getTotalCredito(this.creditoForm.get('valor_credito')?.value, this.creditoForm.get('interes')?.value),
  
      valor_cuota: this.getValorCuota(this.creditoForm.get('valor_credito')?.value, this.creditoForm.get('interes')?.value),
      fecha_inicio: moment().format('DD/MM/YYYY'),
      cliente: this.idCliente,
      ultimo_pago: ''
    }
    
    if(this.creditoForm.valid){
      this.mainService.addCredito(cliente)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/main/rutero')
          }else{
            console.log(resp)
          }
        })
    }
  }

  getTotalCredito(num1: number, num2: number): number {
    let valor = num1;
    let interes = num2;

    return (valor * interes)  / 100 + valor;
  }

  getValorCuota(num1: number, num2: number):number{
    let valor = num1;
    let interes = num2;
    let total = (valor * interes) / 100 + valor;

    return Math.round(total / this.creditoForm.get('total_cuotas')?.value);
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Desea continuar?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.crearCredito()
        },
        reject: () => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
}
}