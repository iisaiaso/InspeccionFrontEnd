import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';
  mensaje: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ingresar() {
    console.log(this.user, this.password);

    if (this.user == '' && this.password == '') {
      var incorrectAlert = document.getElementById('incorrect-success-alert');
      if (incorrectAlert) {
        incorrectAlert.style.display = 'block';
        this.mensaje = 'Campos vacios';
      }
      setTimeout(function () {
        if (incorrectAlert) {
          incorrectAlert.style.display = 'none';
        }
      }, 1000);
      return false;
    } else if (this.user == 'admin' && this.password == '1234') {
      alert('Bienvenido' + '  ' + this.user);
      this.router.navigate(['/index/']);
      return true;
    } else {
      var incorrectAlert = document.getElementById('incorrect-success-alert');
      if (incorrectAlert) {
        incorrectAlert.style.display = 'block';
        this.mensaje = 'Correo y contraseña incorrectos';
      }
      setTimeout(function () {
        if (incorrectAlert) {
          incorrectAlert.style.display = 'none';
        }
      }, 1000);
      return false;
    }
  }
  cancelar() {
    this.user = '';
    this.password = '';
  }
}
