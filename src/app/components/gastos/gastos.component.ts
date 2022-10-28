import { Component, OnInit } from '@angular/core';
import { ListaDeGastos, CrearGasto } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [MessageService]
})
export class GastosComponent implements OnInit {

  gastos: ListaDeGastos[] = [];
  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required])
  gasto: FormControl = this.fb.control('', [Validators.required])
  nota: FormControl = this.fb.control('');
  fecha: string = moment().utc(true).format('DD/MM/YYYY');

  dialogoInserGasto: boolean = false;

  get user() {
    return this.authService.user;
  }

  constructor(private mainService: MainService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mainService.getListaGastos()
      .subscribe(resp => {
        this.gastos = resp
      })
  }

  crearGasto() {
    this.loading = true;
    let gasto: CrearGasto = {
      fecha: this.fecha,
      valor: this.valor.value,
      gasto: this.gasto.value,
      idRuta: this.user.ruta,
      nota: this.nota.value
    }
        
    this.mainService.addGasto(gasto)
      .subscribe(resp => {
        if (resp === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFul',
            detail: 'Gasto agregado',
            life: 3000
          })
          this.dialogoInserGasto = false;
          this.router.navigateByUrl('/main/caja')
          this.loading = false
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: resp.error.errors.valor.msg,
            life: 3000
          })
          this.dialogoInserGasto = false;
          this.loading = false
        }
      })
  
  }

  confirmarGasto(){
    this.crearGasto();
  }

}
