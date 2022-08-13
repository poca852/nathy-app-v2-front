import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Ruta } from '../../interfaces/admin.interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-ruta',
  templateUrl: './main-ruta.component.html',
  styleUrls: ['./main-ruta.component.css']
})
export class MainRutaComponent implements OnInit, OnDestroy {

  ruta: Ruta | null;
  loading: boolean = true

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.adminService.getRuta(id))
      )
      .subscribe(resp => {
        this.ruta = resp.ruta
        this.loading = false
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ruta = null;
    this.loading = true
  }

}
