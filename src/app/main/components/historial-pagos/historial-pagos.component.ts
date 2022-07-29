import { Component, Input, OnInit } from '@angular/core';
import { Pago } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css']
})
export class HistorialPagosComponent implements OnInit {

  @Input() id: string = '';

  pagos: Pago[] = []

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getPagos(this.id)
      .subscribe(resp => {
        if(resp.ok){
          this.pagos = resp.pagos
        }
      })
  }

}
