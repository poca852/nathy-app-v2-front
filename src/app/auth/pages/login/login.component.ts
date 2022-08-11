import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

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

  constructor(private messageService: MessageService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loading = true
    this.messageService.clear();
    if(this.formLogin.valid){
      this.authService.login(this.formLogin.value)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/main')
            this.loading = false;
          }else{
            this.messageService.add({severity:'error', summary: resp });
            this.loading = false;
          }
        })
    }else{
      this.messageService.add({severity: 'error', summary: 'Ingresa Tus datos'})
      this.loading = false;
    }
  }

}
