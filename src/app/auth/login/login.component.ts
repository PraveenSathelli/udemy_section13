import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true }
}

function emailIsunique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: false });
}

let initalValue = '';
const saverForm = window.localStorage.getItem('saved-login-email');
if (saverForm) {
  const loadedForm = JSON.parse(saverForm);
  initalValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {

    // const saverForm = window.localStorage.getItem('saved-login-email');

    // if (saverForm) {
    //   const loadedForm = JSON.parse(saverForm);
    //   this.form.patchValue({
    //     email: loadedForm.email
    //   })
    // }

    this.form.controls.email.valueChanges.pipe(
      debounceTime(500)
    ).subscribe({
      next: (value) => {
        window.localStorage.setItem("saved-login-email", JSON.stringify({ email: value }));
      }
    })
  }
  form = new FormGroup({
    email: new FormControl(initalValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [(control) => emailIsunique(control)]

      // updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), (control) => mustContainQuestionMark(control)],
    })
  });

  onSubmit() {
    // this.form.controls.email.addValidators()
    console.log(this.form);
    const enterEmail = this.form.value.email;
    console.log(enterEmail);
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
}