import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  NgControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({ selector: '[appValidator]' })
export class ValidatorDirective {
  i = 0;
  private erros: any;

  @Input('submitted') submitted = false;
  @Input('appValidator') fc!: UntypedFormControl | AbstractControl;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl
  ) {}

  @HostListener('document:click', ['$event']) touched(event: any) {
    const name = event.target.attributes.formcontrolname;
    if (name != undefined) {
      if (this.ngControl.name == name.value) {
        this.i++;
      } else {
        if (this.i >= 1) {
          this.fc.markAsTouched();
        }
      }
    }
    this.addValidator(this.erros);
  }

  @HostBinding('class.is-invalid')
  invalid = false;
  

  ngOnChanges() {
    this.addValidator(this.erros);
    this.fc.valueChanges.subscribe((data) => {
      this.addValidator(this.erros);
    });
  }

  addValidator(errors?: any) {
    if (
      this.fc.invalid &&
      (this.fc.dirty || this.fc.touched || this.submitted)
    ) {
      this.invalid = true;
      this.fc.markAsTouched();
      this.addMessage(errors);
    } else {
      this.invalid = false;
      this.removeMessage();
    }
  }

  addMessage(error?: any) {
    if (this.control()) {
      const element = this.renderer.createElement('mat-error');
      let buttontext1 = '';
      const errors = this.fc.errors;
      if (errors != null && errors['required']) {
        buttontext1 = $localize`You must fill this field.`;
      } else if (errors != null && errors['min']) {
        buttontext1 = $localize`You entered a value less than the minimum value you must enter.`;
      } else if (errors != null && errors['minLength']) {
        buttontext1 = $localize`You entered a value less than the minimum required characters.`;
      } else if (errors != null && errors['pattern']) {
        buttontext1 = $localize`You entered an incorrect range of values.`;
      } else if (errors != null && errors['email']) {
        buttontext1 = $localize`Make sure you write your e-mail address correctly.`;
      } else {
        buttontext1 = $localize`You are stuck on an unknown authentication.`;
      }
      const text = this.renderer.createText(buttontext1);
      const parent = this.renderer.parentNode(this.elRef.nativeElement);
      this.renderer.appendChild(element, text);
      this.renderer.appendChild(parent, element);
    }
  }

  removeMessage() {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    if (parent != null || parent != undefined) {
      Array.from(parent.children).forEach((child) => {
        if ((child as HTMLDivElement).classList.contains('invalid-feedback')) {
          (child as HTMLDivElement).remove();
        }
      });
    }
  }
  
  control() {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    if ((parent as HTMLDivElement).childNodes.length > 1) {
      return false;
    } else {
      return true;
    }
  }
}
