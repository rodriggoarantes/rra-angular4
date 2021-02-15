import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '@app/services/user.service';
import { User } from '@app/models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  signup(form: NgForm) {
    const { name, email, password, confirmPass } = form.value;

    if (!form.valid || !name || !email || !password || !confirmPass) {
      alert('Campos obrigatorios devem ser informados');
      return;
    }

    if (password !== confirmPass) {
      alert('Senha e confirmação são divergentes');
      return;
    }

    this.userService.create(name, email, password, confirmPass).subscribe(
      (retorno: User) => {
        if (retorno && retorno._id) {
          alert('Usuario criado com sucesso');
        } else {
          alert('Usuario não cadastrado');
        }
        this.router.navigate(['/login']);
      },
      (e) => {
        alert(e.error);
      }
    );
  }
}
