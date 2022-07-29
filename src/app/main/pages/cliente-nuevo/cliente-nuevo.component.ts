import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styles: [
    `
    .main{
      margin-top: 60px;
    }
    `
  ]
})
export class ClienteNuevoComponent implements OnInit {

  formCliente: FormGroup = this.fb.group({
    dpi: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    alias: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]]
  })

  constructor(private mainService: MainService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formCliente.valid){
      this.mainService.addCliente(this.formCliente.value)
        .subscribe(ok => {
          if(ok === true){
            this.router.navigateByUrl('/main/renovaciones')
          }
        })
    }
  }

}
