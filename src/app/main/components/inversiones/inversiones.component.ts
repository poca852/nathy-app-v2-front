import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css'],
  providers: [ConfirmationService]
})
export class InversionesComponent implements OnInit {

  loading: boolean = false;

  valor: FormControl = this.fb.control(null, [Validators.required, Validators.min(0)])
  nota: FormControl = this.fb.control('');

  constructor(private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router) { }

  ngOnInit(): void {
  }

  crearInversion() {
    this.loading = true;
    this.mainService.addInversion(this.valor.value, this.nota.value)
      .subscribe(resp => {
        if (resp === true) {
          this.router.navigateByUrl('/main/caja')
          this.loading = false;
        }
      })
  }

  confirm(event: Event) {
    if (this.valor.valid) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Desea continuar?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.crearInversion()
        }
      });
    }
  }
}
