import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.messageService.clear();
    this.adminService.login(this.formLogin.value)
      .subscribe(resp => {
        if(resp === true){
          this.router.navigateByUrl('/admin/home');
        }else{
          this.messageService.add({severity: 'error', summary: resp})
        }
      })
  }

}
