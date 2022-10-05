import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  openModal: boolean = false;

  formUser: FormGroup = this.fb.group({
    username: [''],
    password: [''],
    nombre: ['']
  })

  get user(){
    return this.adminService.user;
  }

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formUser.reset({
      username: this.user.username,
      nombre: this.user.nombre
    })
  }

  actualizarUser(){
    this.adminService.actualizarUsuario(this.user.id, this.formUser.value)
      .subscribe(resp => {
        this.adminService.revalidarToken().subscribe()
        this.openModal = false;
        Swal.fire('Success', 'Usuario actualizado correctamente', 'success')
      })
  }
  

}
