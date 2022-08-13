import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-volver',
  templateUrl: './btn-volver.component.html',
  styleUrls: ['./btn-volver.component.css']
})
export class BtnVolverComponent implements OnInit {

  @Input() backBtn: string = ''

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigateByUrl(this.backBtn)
  }

}
