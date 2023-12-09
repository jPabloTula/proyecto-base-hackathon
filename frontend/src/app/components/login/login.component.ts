import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  view: boolean = false;
  backgroundCharge: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.view = true;
    this.backgroundCharge = 'backgroundCharge';
    setTimeout(() => {
      this.view = false;
      this.backgroundCharge = '';
      this.router.navigate(['/home']);
    }, 1000);
    console.log('Nombre de usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
}
