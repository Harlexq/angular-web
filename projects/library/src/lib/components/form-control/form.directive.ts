import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidator]',
  standalone: true,
})
export class ValidatorDirective {
  i = 0;
  private erros: any;

  @Input('submitted') submitted = false;
  @Input('appValidator') fc!: FormControl | AbstractControl;

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
        buttontext1 = `Bu alanı doldurmanız gerekmektedir.`;
      } else if (errors != null && errors['min']) {
        buttontext1 = `Girmeniz gereken minimum değerden daha düşük bir değer girdiniz.`;
      } else if (errors != null && errors['minLength']) {
        buttontext1 = `Gerekli minimum karakter sayısından daha az bir değer girdiniz.`;
      } else if (errors != null && errors['pattern']) {
        buttontext1 = `Yanlış bir değer aralığı girdiniz.`;
      } else if (errors != null && errors['email']) {
        buttontext1 = `E-posta adresinizi doğru yazdığınızdan emin olun.`;
      } else {
        buttontext1 = `Bilinmeyen bir kimlik doğrulamasında takılıp kaldınız.`;
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
