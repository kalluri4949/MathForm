import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  constructor() {}
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNum()),
      b: new FormControl(this.randomNum()),
      answer: new FormControl(''),
    },
    [
      (form: AbstractControl): any => {
        const { a, b, answer } = form.value;
        // tslint:disable-next-line:radix
        if (a + b === parseInt(answer)) {
          return null;
        }
        return { addition: true };
      },
    ]
  );
  randomNum(): number {
    return Math.floor(Math.random() * 10);
  }
  get a(): FormControl {
    return this.mathForm.value.a;
  }
  get b(): FormControl {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {}
}
