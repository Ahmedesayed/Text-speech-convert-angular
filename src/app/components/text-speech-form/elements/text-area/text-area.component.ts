
import { BaseElement } from './../base-form-element';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextAreaComponent), multi: true }
  ]
})
export class TextAreaComponent extends BaseElement implements OnInit {
  @Input() maxLength = 50;
  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
