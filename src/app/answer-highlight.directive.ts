import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective implements OnInit {
  constructor(private el: ElementRef, private controlName: NgControl) {}
  ngOnInit(): void {
    this.controlName.control.parent.valueChanges
      .pipe(
        map(({ a, b, answer }) => {
          return Math.abs((a + b - answer) / (a + b));
        })
      )
      .subscribe((value) => {
        console.log(value);
        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        }
        this.el.nativeElement.classList.remove('close');
      });
  }
}
