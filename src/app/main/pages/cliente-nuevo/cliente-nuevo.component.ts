import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styles: [],
  providers: [MessageService]
})
export class ClienteNuevoComponent implements OnInit {

  loading: boolean = false;
  dialogClienteNuevo: boolean = false;
  
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

  constructor(
    private mainService: MainService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formCliente.reset({idRuta: this.user.ruta});
  }

  guardar(){
    this.loading = true;
    if(this.formCliente.valid){
      this.mainService.addCliente(this.formCliente.value)
      .subscribe(ok => {
        if(ok === true){
          this.loading = false
          this.dialogClienteNuevo = false;
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFul',
            detail: `${this.formCliente.get('nombre').value} Agregado`,
            life: 3000
          })
          this.router.navigateByUrl('/main/renovaciones')
          this.loading = false
        }else{
          this.dialogClienteNuevo = false;
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'SuccessFul',
            detail: ok.error.msg,
            life: 3000
          })
        }
      })
    }
    
  }

  confirmarClienteNuevo(){
    this.guardar()
  }
  
}