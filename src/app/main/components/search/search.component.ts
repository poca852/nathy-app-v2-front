import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  debuncer: Subject<string> = new Subject();

  form: FormGroup = this.fb.group({
    termino: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.debuncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDebounce.emit(valor)
      })
  }

  buscar(){
    this.onEnter.emit(this.form.value)
  }

  teclaPresionada(){
    this.debuncer.next(this.form.value)
  }

}
