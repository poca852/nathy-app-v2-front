import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css'],
  providers: [ConfirmationService]
})
export class RetirosComponent implements OnInit {

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)]);
  nota: FormControl = this.fb.control('');

  constructor(private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearRetiro(){
    if(this.valor.valid){
      this.mainService.addRetiro(this.valor.value, this.nota.value)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/main')
          }
        })
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Desea continuar?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.crearRetiro()
        },
        reject: () => {}
        //     this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        // }
    });
  }

}
