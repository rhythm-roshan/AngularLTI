import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  URL = "https://2kpyh8fekl.execute-api.us-east-1.amazonaws.com/prod/login"
  model: any = {};
  load = true;

  constructor(private req: Router) {
  }

  ngOnInit() {
  }

  xhrRequest(xhr) {
    xhr.onreadystatechange = function () {
      var temp = true;
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          if (data.status == "Success") {
            alert("login Successful")
            temp = true

          }
          else {
            alert("Login Failed")
            temp = false;
          }
        }
      }
      return temp
    }


  }

  login() {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("POST", this.URL, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({username: this.model.username, password: this.model.password}));
    this.xhrRequest(xhr);
    this.route();



  }

  route() {

    this.load = false;
    this.req.navigate(['/first-page']);
  }
}
