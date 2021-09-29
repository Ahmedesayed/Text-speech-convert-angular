import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    template : ''
})
  
export class BaseElement implements OnChanges, ControlValueAccessor {


    @Input() formControlName: string | undefined;
    @Input() formGroup : FormGroup = new FormGroup({});
    @Input() validators : Validators = [];
    @Input() label : string = '';
    @Input() title : string = '';
    
    formControl : FormControl = new FormControl() ;
    @Output() onProcessingEvent = new EventEmitter();
    @Output() doSubmit = new EventEmitter();
  
    propagateChange: any = () => { };
    validateFn: any = () => { };
  
    currentVal: any = "";
  
    constructor() {
    }
  
    ngOnChanges(changes: SimpleChanges) {
        this.setControl();
    }

    setControl(){
        if(this.formControlName && this.formGroup){
          this.formControl = new FormControl('',this.validators)
          this.formGroup.setControl(this.formControlName,this.formControl)
        }
    }
  
    writeValue(obj: any): void {
      if (this.currentVal && !obj) {
        this.releaseResources();
      }
      this.currentVal = obj;
    }
  
    registerOnChange(fn: any): void {
      this.propagateChange = fn;
    }
  
    registerOnTouched(fn: any): void {
  
    }
  
    setDisabledState?(isDisabled: boolean): void {
  
    }
  
    onChange(value: any) {
      this.currentVal = value;
      this.propagateChange(value);
    }
  
  
    protected releaseResources() {
    }
  
  }