import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[message]',
  standalone: true,
})
export class MessageDirective {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.inner
  }
}
