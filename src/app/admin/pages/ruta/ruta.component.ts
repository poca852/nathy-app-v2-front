import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Ruta } from 'src/app/interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {

  ruta: Ruta;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.adminService.getRutaById(id))
      )
      .subscribe(resp => this.ruta = resp.ruta)
  }

}
