import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  login(form: NgForm) {
    const { email, password } = form.value;

    if (form.valid && email && password) {
      this.userService.login(email, password).subscribe((user) => {
        console.log(JSON.stringify(user));
        if (this.userService.isAuth()) {
          this.router.navigate(['/sunshine']);
        } else {
          alert('Erro ao autenticar o usuario');
        }
      });
    } else {
      alert('Informe os dados corretos para login');
    }
  }
}
