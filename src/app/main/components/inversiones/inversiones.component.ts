import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class InversionesComponent implements OnInit {

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)])
  nota: FormControl = this.fb.control('');

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearInversion(){
    if(this.valor.valid)[
      this.mainService.addInversion(this.valor.value, this.nota.value)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/main')
          }
        })
    ]
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Desea continuar?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.crearInversion()
        },
        reject: () => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
  }
}
