import { Component, OnInit } from '@angular/core';
import { Rol, Ruta, User } from 'src/app/interfaces/admin.interfaces';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-empleados',
  templateUrl: './table-empleados.component.html',
  styleUrls: ['./table-empleados.component.scss']
})
export class TableEmpleadosComponent implements OnInit {

  empleadoDigalog: boolean = false;
  deleteEmpleadoDialog: boolean = false;
  empleados: User[] = [];
  empleado: User | undefined;
  roles: Rol[];
  rutas: Ruta[];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  formEmpleado: FormGroup = this.fb.group({
    username: ['', Validators.required],
    nombre: ['', Validators.required],
    password: [''],
    ruta: ['', Validators.required],
    rol: ['', Validators.required]
  })

  get user() {
    return this.adminService.user;
  }

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.adminService.getAllEmpleados()
      .subscribe(resp => {
        this.empleados = resp
      })

    this.adminService.getRoles()
      .subscribe(resp => this.roles = resp.roles)

    this.adminService.getRutas()
      .subscribe(resp => this.rutas = resp)

    this.cols = [
      { field: 'username', header: 'Usuario' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'ruta', header: 'Ruta' },
      { field: 'rol', header: 'Rol' },
    ];
  }

  openNew() {
    this.empleado;
    this.empleadoDigalog = true;
  }

  editEmpleado(empleado: User) {
    this.empleado = { ...empleado }
    this.formEmpleado.reset({
      username: empleado.username,
      nombre: empleado.nombre,
      rol: empleado.rol._id,
      ruta: empleado.ruta._id
    })
    this.empleadoDigalog = true;
  }

  deleteEmpleado(empleado: User) {
    this.deleteEmpleadoDialog = true;
    this.empleado = { ...empleado };
  }

  confirmDelete() {
    this.adminService.deleteEmpleado(this.empleado.id)
      .subscribe(resp => {
        if (resp) {
          this.deleteEmpleadoDialog = false;
          this.empleados = this.empleados.filter(val => val.id !== this.empleado.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado eliminado', life: 3000 });
          this.empleado = undefined;
        }
      })
  }

  hideDialog() {
    this.empleadoDigalog = false;
  }

  saveProduct() {
    if (this.formEmpleado.valid) {
      if (!!this.empleado?.id) {
        // actualizamos
        this.adminService.actualizarUsuario(this.empleado.id, this.formEmpleado.value)
          .subscribe(resp => {
            if (resp.ok === true) {
              //Swal.fire('Success', 'Usuario actualizado', 'success');
              this.empleadoDigalog = false;
              this.adminService.getAllEmpleados()
                .subscribe(resp => this.empleados = resp)
            }
          })
      } else {
        // creamos un nuevo usuario
        this.adminService.addEmpleado(this.formEmpleado.value)
          .subscribe(resp => {
            if (resp.ok === true) {
              this.hideDialog()
              //Swal.fire('Success', 'Usuario agregado correctamente', 'success')
              this.adminService.getAllEmpleados()
                .subscribe(resp => this.empleados = resp)
            }
          })
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.empleados.length; i++) {
      if (this.empleados[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
