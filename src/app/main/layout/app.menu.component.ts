import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor( public layoutService: LayoutService ) { }

    ngOnInit() {
        this.model = [
            {
                // label: 'Home',
                items: [
                    { 
                        label: 'Rutero', 
                        icon: 'pi pi-fw pi-list', 
                        routerLink: ['rutero'] 
                    },

                    { 
                        label: 'Verificados', 
                        icon: 'pi pi-fw pi-check', 
                        routerLink: ['verificados'] 
                    },

                    { 
                        label: 'Renovaciones', 
                        icon: 'pi pi-fw pi-dollar', 
                        routerLink: ['renovaciones'] 
                    },

                    { 
                        label: 'Cliente Nuevo', 
                        icon: 'pi pi-fw pi-user-plus', 
                        routerLink: ['cliente-nuevo'] 
                    },

                    { 
                        label: 'Oficina', 
                        icon: 'pi pi-fw pi-file-excel', 
                        routerLink: ['oficina'] 
                    },

                    { 
                        label: 'Caja', 
                        icon: 'pi pi-fw pi-chart-bar', 
                        routerLink: ['caja'] 
                    }
                ]
            }
        ];
    }
}
