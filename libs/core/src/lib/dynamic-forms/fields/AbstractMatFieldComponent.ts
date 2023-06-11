import { ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, Directive } from "@angular/core";
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {FocusMonitor} from "@angular/cdk/a11y";
import {FormField} from "@satipasala/base";
import {MatFormFieldControl} from "@angular/material/form-field";

@Directive()
export abstract class AbstractMatFieldComponent<V extends FormField<any>> implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy, OnInit {
  @Input() field: V;
  @Input() form: FormGroup;
  public formControl: FormControl;

  protected constructor(
    formBuilder: FormBuilder,
    public _focusMonitor: FocusMonitor,
    public _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }


  ngOnInit() {
    this.formControl = <FormControl>this.form.get(this.field.id);
    this.formControl.setValue(this.field.value);
    //this.formControl.setValidators([Validators.required])
  }

  static nextId = 0;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = true;
  controlType = 'example-tel-input';
  id = `example-tel-input-${AbstractMatFieldComponent.nextId++}`;
  onChange = (_: any) => {
    console.log("changed")
  };
  onTouched = () => {};

  get empty() {

    return !this.field.value
  }


  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): any {
    return this.field.value;
  }
  set value(val: any | null) {
    this.field.value = val;
    this.stateChanges.next();
  }


  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() === 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  writeValue(tel: any | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.form.value);
  }

  readonly autofilled: boolean;

}
