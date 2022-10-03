import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private adminService: AdminService,
        private router: Router
    ) { }

    logout() {
        this.adminService.logout()
        this.router.navigateByUrl('/admin/login')
    }

    onConfigButtonClick(){
        this.layoutService.showConfigSidebar();
    }
}
