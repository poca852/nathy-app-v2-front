import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly messageService: MessageService
  ) { }

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
            this.messageService.add({ severity: 'error', summary: 'Alerta', detail: resp, life: 2100 });
            this.loading = false;
          }
        })
    } else {
      // Swal.fire('Error', 'Complete el formulario', 
      this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Complete el formulario', life: 2100 });
      this.loading = false;
    }
  }

}
