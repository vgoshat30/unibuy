import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = '';
  password:string = '';

  constructor(private http: HttpClient) { }

  login() {
    this.http.post('http://localhost:8080/login', {email: this.email, password: this.password}).subscribe(res => {
      console.log(res);
    });
  }
}
