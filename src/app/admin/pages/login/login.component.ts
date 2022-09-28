import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.loading = true;
    if(this.formLogin.invalid){
      Swal.fire('Error', 'Por favor Ingresa los datos', 'error')
      this.loading = false;
      return;
    }

    this.adminService.login(this.formLogin.value)
      .subscribe(resp => {
        console.log(resp)
        if(resp === true){
          this.router.navigateByUrl('/admin/home')
          this.loading = false;
        }else{
          Swal.fire('Error', resp, 'error');
          this.loading = false;
        }
      })
  }

}
