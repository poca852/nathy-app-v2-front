import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  openMenu: boolean = false

  get user(){
    return {...this.adminService.user}
  }

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

}
