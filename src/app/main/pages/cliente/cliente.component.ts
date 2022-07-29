import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

interface Cliente {
  dpi: string;
  nombre: string;
  alias: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  ruta: string;
  creditos: string[];
  id: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente!: Cliente;

  constructor(private mainService: MainService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        switchMap(({id}) => this.mainService.getCliente(id)),
        map(resp => resp.cliente)
      )
      .subscribe(resp => this.cliente = resp)
  }

}
