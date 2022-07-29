import { Component, Input, OnInit } from '@angular/core';
import { Credito } from '../../interfaces/main.interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-variable',
  templateUrl: './pago-variable.component.html',
  styleUrls: ['./pago-variable.component.css']
})
export class PagoVariableComponent implements OnInit {

  @Input() credito!: Credito

  pago: FormControl = this.fb.control(null, [Validators.required, Validators.min(1)]);

  constructor(private fb: FormBuilder,
              private mainService: MainService,
              private router: Router) { }

  ngOnInit(): void {
    this.pago.reset(0);
  }

  pagar(){
    if(this.pago.valid){
      this.mainService.addPago(this.credito.id, this.pago.value)
        .subscribe(resp => {
          if(resp.ok){
            this.router.navigateByUrl('/main')
          }
        })
    }
  }

}
