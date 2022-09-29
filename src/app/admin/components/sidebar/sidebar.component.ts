import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    .sidebar{
      background-color: red !important;
    }
  `
  ]
})
export class SidebarComponent implements OnInit {

  @Input() openMenu: boolean = false;
  itemsMenu: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.itemsMenu = [
      {
        label: 'Clientes'
      }
    ]
  }

}
