import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseElement } from '../base-form-element';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }
  ]
})
export class SelectComponent extends BaseElement implements OnInit {

  @Input() options : IOption[] = [];

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}

export interface IOption{
  value:any;
  viewValue:string;
  id:number
}
