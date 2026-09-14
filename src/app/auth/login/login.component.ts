import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[FormsModule]
})
export class LoginComponent {

  onSuccess(loginForm:NgForm) {
    console.log("login form");
    console.log(loginForm)
  }

}
