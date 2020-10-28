import { MathValidators } from './../math-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  constructor() {}
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNum()),
      b: new FormControl(this.randomNum()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
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

  ngOnInit(): void {
    // tslint:disable-next-line:prefer-const
    this.mathForm.statusChanges
      .pipe(
        filter((value) => {
          return value === 'VALID';
        }),
        scan(
          (acc, value) => {
            return {
              numberAnswered: acc.numberAnswered + 1,
              startTime: acc.startTime,
            };
          },
          { numberAnswered: 0, startTime: new Date() }
        ),

        delay(500)
      )
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(({ numberAnswered, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberAnswered / 1000;
        this.mathForm.setValue({
          a: this.randomNum(),
          b: this.randomNum(),
          answer: '',
        });
      });
  }
}
