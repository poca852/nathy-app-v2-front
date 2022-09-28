import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value)
        .subscribe(resp => {
          if (resp === true) {
            this.router.navigateByUrl('/main')
            this.loading = false;
          } else {
            Swal.fire('Error', resp, 'error')
            this.loading = false;
          }
        })
    } else {
      Swal.fire('Error', 'Complete el formulario', 'error')
      this.loading = false;
    }
  }

}
