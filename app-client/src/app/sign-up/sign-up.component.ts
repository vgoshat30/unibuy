import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email:string = '';
  password:string = '';
  name:string = '';
  showLoginPage: boolean = false;

  constructor(private http: HttpClient) { }

  signup() {
    this.http.post('http://localhost:8080/signup', {email: this.email, password: this.password, name: this.name}).subscribe(res => {
      if (res) {
        this.changePage();
      } else {
        alert('Error with create new user, please try again')
      }
    });
  }

  changePage() {
    this.showLoginPage = !this.showLoginPage;
  }
}
