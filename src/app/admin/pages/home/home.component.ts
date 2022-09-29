import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  openMenu: boolean = false;
  configUser: MenuItem[];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configUser = [
      {
        label: 'Salir',
        icon: 'pi pi-power-off',
        command: () => {
          this.logout()
        }
      }
    ]
  }

  logout(){
    this.adminService.logout()
    this.router.navigateByUrl('/admin/login')
  }

}
