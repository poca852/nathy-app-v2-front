import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Pago } from '../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aditar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css'],
  providers: [MessageService]
})
export class EditarPagoComponent implements OnInit {

  pago!: Pago;
  valor: FormControl = this.fb.control(0, [Validators.required, Validators.min(1)]);
  loading: boolean = false;

  constructor( 
    private mainService: MainService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.mainService.getPago(id)),
      )
      .subscribe(resp => {
        this.pago = resp.pago
      })
      
  }

  pagar(){
    this.messageService.clear();
    this.loading = true
    if(this.valor.value === 0){
      console.log('error')
      this.messageService.add({severity: 'error', summary: 'No puede ingresar pago de 0'})
      this.loading = false
    }

    this.mainService.updatePago(this.pago.id, this.valor.value)
      .subscribe(resp => {
        if(resp.ok){
          this.router.navigateByUrl('/main/verificados')
          this.loading = false
        }
      })
  }

}
