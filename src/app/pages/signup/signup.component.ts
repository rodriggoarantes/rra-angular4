import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "@app/services/user.service";
import { User } from "@app/models/User";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  signup(event: any) {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPass = event.target.confirmPass.value;

    if (!name || !email || !password || !confirmPass) {
      alert("Campos obrigatorios devem ser informados");
    }

    if (password !== confirmPass) {
      alert("Senha e confirmaçãos são divergentes");
    }

    this.userService.create(name, email, password, confirmPass).subscribe(
      (retorno: User) => {
        if (retorno && retorno._id) {
          alert("Usuario criado com sucesso");
        } else {
          alert("Usuario não cadastrado");
        }
        this.router.navigate(["/login"]);
      },
      e => {
        alert(e.error);
      }
    );
  }
}
