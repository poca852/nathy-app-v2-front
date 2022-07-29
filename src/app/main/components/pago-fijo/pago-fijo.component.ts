import { Component, Input, OnInit } from '@angular/core';
import { Credito } from '../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

interface Pago{
  cuotas: number;
  valor: number
}

@Component({
  selector: 'app-pago-fijo',
  templateUrl: './pago-fijo.component.html',
  styleUrls: ['./pago-fijo.component.css']
})
export class PagoFijoComponent implements OnInit {

  @Input() credito!: Credito 

  pagoSeleccionado: FormControl = this.fb.control( null, Validators.required )

  pago: Pago[] = []

  constructor( private fb: FormBuilder,
                private mainService: MainService,
                private router: Router ) { }

  ngOnInit(): void {
    this.pago = this.buildPago(this.credito.total_cuotas, this.credito.valor_cuota);
    this.pagoSeleccionado.reset(this.credito.valor_cuota);
  }

  buildPago(cuotas: number, valor: number){
    let arr: Pago[] = []
    for (let i = 0; i < cuotas; i++) {
      arr.push({
        cuotas: i + 1,
        valor: valor * (i+1)
      })
    }

    return arr;
  }

  pagar(){
    this.mainService.addPago(this.credito.id, this.pagoSeleccionado.value)
      .subscribe(resp => {
        if(resp.ok){
          this.router.navigateByUrl('/main')
        }
      })
  }

}
