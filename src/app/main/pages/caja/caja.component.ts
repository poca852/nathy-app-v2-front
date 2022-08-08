import { Component, OnInit } from '@angular/core';
import { Caja } from '../../interfaces/main.interfaces';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CajaComponent implements OnInit {

  caja!: Caja;

  constructor(private mainService: MainService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.mainService.getCaja()
      .subscribe(resp => {
        this.caja = resp.caja;
      })
  }

  cerrarRuta(){
    this.mainService.closeRuta(this.caja.ruta)
      .subscribe(resp => {
        if(resp){
          this.authService.logout();
        }
      })
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Estas seguro?!!',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.cerrarRuta()
        },
        // reject: () => {
        //     this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        // }
    });
  }

}
