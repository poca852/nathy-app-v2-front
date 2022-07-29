import { Component, OnInit } from '@angular/core';
import { Caja } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  caja!: Caja;

  constructor(private mainService: MainService,
              private router: Router) { }

  ngOnInit(): void {
    this.mainService.getCaja()
      .subscribe(resp => {
        this.caja = resp;
      })
  }

}
