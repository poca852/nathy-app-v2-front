import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Cliente, Pago } from '../../../interfaces/main.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [MessageService]
})
export class ClienteComponent implements OnInit {

  cliente!: Cliente;
  diaglogCliente: boolean = false;
  formCliente: FormGroup = this.fb.group({
    dpi: ['', Validators.required],
    nombre: ['', Validators.required],
    alias: ['', Validators.required],
    ciudad: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
  })

  constructor(private mainService: MainService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        switchMap(({id}) => this.mainService.getCliente(id)),
        map(resp => resp.cliente)
      )
      .subscribe(resp => {
        this.cliente = resp;

        this.formCliente.reset({
          dpi: this.cliente.dpi,
          nombre: this.cliente.nombre,
          alias: this.cliente.alias,
          ciudad: this.cliente.ciudad,
          direccion: this.cliente.direccion,
          telefono: this.cliente.telefono
        })
      })
  }

  hideDialog(){
    this.diaglogCliente = false;
  }

  actualizarCliente(){
    if(this.formCliente.valid){
      this.adminService.updateCliente(this.cliente.id, this.formCliente.value)
        .subscribe(resp => {
          if(resp){
            this.diaglogCliente = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente actualizado', life: 2100 });
            this.mainService.getCliente(this.cliente.id).subscribe(resp => this.cliente = resp.cliente)
          }
        })
    }
  }

}
