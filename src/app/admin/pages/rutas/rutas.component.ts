import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/interfaces/admin.interfaces';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss'],
  providers: [MessageService]
})
export class RutasComponent implements OnInit {

  rutaDialog: boolean = false;
  deleteRutaDialog: boolean = false;
  rutas: Ruta[] = [];
  ruta: Ruta | undefined;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  optionsGastosCobrador: any[];

  formRuta: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    ciudad: ['', Validators.required],
    ingresar_gastos_cobrador: [true, Validators.required]
  })

  get user() {
    return this.adminService.user;
  }

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.adminService.getRutas()
      .subscribe(resp => this.rutas = resp)


    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'ciudad', header: 'Ciudad' },
      { field: 'gastosCobrador', header: 'Gastos cobrador' },
    ]

    this.optionsGastosCobrador = [{ label: 'No', value: false }, { label: 'Si', value: true }];
  }

  openNew() {
    this.ruta;
    this.formRuta.reset()
    this.rutaDialog = true;
  }

  editRuta(ruta: Ruta) {
    this.ruta = { ...ruta };
    this.formRuta.reset({
      nombre: ruta.nombre,
      ciudad: ruta.ciudad,
      ingresar_gastos_cobrador: ruta.ingresar_gastos_cobrador
    })
    this.rutaDialog = true;
  }

  deleteRuta(ruta: Ruta) {
    this.deleteRutaDialog = true;
    this.ruta = { ...ruta };
  }

  confirmDelete() {
    this.adminService.deleteRuta(this.ruta.id)
      .subscribe(resp => {
        if (resp) {
          this.deleteRutaDialog= false;
          this.adminService.getRutas().subscribe(resp => this.rutas = resp)
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ruta eliminada', life: 3000 });
          this.ruta = undefined;
        }
      })
  }

  hideDialog() {
    this.rutaDialog = false;
    this.ruta = undefined
  }

  saveRuta() {
    if (this.formRuta.valid) {
      if (!!this.ruta?.id) {
        this.adminService.actualizarRuta(this.ruta.id, this.formRuta.value)
          .subscribe(resp => {
            if (resp.ok === true) {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ruta actualizada', life: 3000 });
              this.rutaDialog = false;
              this.adminService.getRutas().subscribe(resp => this.rutas = resp)
            }
          })
      } else {
        this.adminService.addRuta(this.formRuta.value)
          .subscribe(resp => {
            if (resp.ok === true) {
              this.adminService.getRutas().subscribe(resp => this.rutas = resp);
              this.hideDialog()
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ruta agregada', life: 3000 });
            }
          })
      }
    }
  }

  findIndexById(id: string): number {
    let index = 1;
    for (let i = 0; i < this.rutas.length; i++) {
      if (this.rutas[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

}
