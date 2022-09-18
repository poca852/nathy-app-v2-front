import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styles: []
})
export class ClienteNuevoComponent implements OnInit {

  loading: boolean = false;
  
  formCliente: FormGroup = this.fb.group({
    dpi: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    alias: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    idRuta: ['', [Validators.required]]
  })

  get user(){
    return this.authService.user;
  }

  constructor(private mainService: MainService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.formCliente.reset({idRuta: this.user.ruta});
  }

  guardar(){
    this.loading = true;

    Swal.fire({
      title: `Agregando a ${this.formCliente.get('nombre').value}`,
      text: "Por favor revisa bien los datos, Revertir esto es complicado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregar Cliente'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.formCliente.valid){
          this.mainService.addCliente(this.formCliente.value)
          .subscribe(ok => {
            if(ok === true){
              this.loading = false
              this.router.navigateByUrl('/main/renovaciones')

              Swal.fire('Success', `${this.formCliente.get('nombre').value} agregado correctamente`, 'success')
              this.loading = false
            }else{
              Swal.fire('Error', ok.error.msg, 'error')
              this.loading = false
            }
          })
        }
      }else{
        this.loading = false
      }
    })
    
  }
  
}