import { afterNextRender, Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent implements OnInit {

  private form = viewChild.required<NgForm>('loginForm');
  private objDestroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const subscription = this.form().valueChanges?.pipe(
        debounceTime(500)
      ).subscribe({
        next: (response) => {
          console.log(response);
          window.localStorage.setItem('saved-username', JSON.stringify(response));
        }
      });

      this.objDestroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  ngOnInit(): void {

  }

  onSuccess(loginForm: NgForm) {

    if (loginForm.invalid)
      return true;

    console.log("login form");
    console.log(loginForm)

    loginForm.reset();
    return false;
  }

}
