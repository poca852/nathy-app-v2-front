import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AdminService } from '../../../services/admin.service';
import { Caja } from '../../../interfaces/main.interfaces';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss']
})
export class CajasComponent implements OnInit, OnChanges {

  fecha: FormControl = this.fb.control([])
  today = new Date();
  cajas: Caja[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    
  }

  buscar(){
    let fecha = moment(this.fecha.value).format('DD/MM/YYYY')
    this.adminService.buscarCajas(fecha)
      .subscribe(resp => {
        this.cajas = resp.filter(caja => caja !== null)
      });
  };

  reset(){
    console.log('reset')
    this.fecha.reset([])
    this.cajas = [];
  }

}
