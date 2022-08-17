import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [ConfirmationService]
})
export class GastosComponent implements OnInit {

  gastos: Gasto[] = [];
  loading: boolean = false;

  valor: FormControl = this.fb.control( null, [Validators.required])
  gasto: FormControl = this.fb.control('', [Validators.required])
  nota: FormControl = this.fb.control('')

  constructor(private mainService: MainService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mainService.getListaGastos()
      .subscribe(resp => {
        this.gastos = resp
      })

  }

  crearGasto(){
    this.loading = true;
    if(this.valor.valid && this.gasto.valid){
      this.mainService.addGasto(this.valor.value, this.gasto.value, this.nota.value)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/main/caja')
            this.loading = false
          }else{
            console.log(resp)
            this.loading = false
          }
        })
    }
  }

  confirm(event: Event) {
    if(this.valor.valid && this.gasto.valid){
      this.confirmationService.confirm({
          target: event.target,
          message: 'Desea continuar?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.crearGasto()
          }
      });
    }
  }

}
