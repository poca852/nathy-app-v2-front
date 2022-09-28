import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Credito } from '../../../interfaces/main.interfaces';
import { MainService } from '../../../services/main.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  credito!: Credito;

  loading: boolean = false;

  pagoSeleccionado: FormControl = this.fb.control('')

  formaPago: any[] = [{name: 'fijo', key: 'A'}, {name: 'variable', key: 'b'}]

  constructor(private activatedRoute: ActivatedRoute,
              private mainService: MainService,
              private fb: FormBuilder,
              private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.mainService.getCredito(id))
      )
      .subscribe(({credito}) => {
        this.credito = credito
      })

      this.pagoSeleccionado.reset('fijo')
}

}