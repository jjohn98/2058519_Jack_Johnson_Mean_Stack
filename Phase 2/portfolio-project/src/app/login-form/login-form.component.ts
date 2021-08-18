
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  msg:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  login(loginRef:NgForm)
  {
    let loginForm = loginRef.value;
    console.log(loginForm);

    let accounts:any = "";
    
    if(localStorage.getItem("allAccounts") != null)
    {
    accounts = localStorage.getItem("allAccounts");
    }

    let accountArray = accounts.split("|?");

    if(accountArray != null){
    for(let i = 0; i < accountArray.length - 1; i++)
    {
      let temp = JSON.parse(accountArray[i]);
      console.log(temp);

      if(temp.username != null && temp.password != null)
      {
        if(loginForm.username == temp.username && loginForm.password == temp.password)
        {
          this.msg = "Successfully logged in User " + loginForm.username + "!";
          localStorage.setItem("loggedInUser", temp.username);
          return;
        }
      }
    }
    }
    this.msg  = "Invalid Username/Password."
  }

  resetAccounts()
  {
    localStorage.setItem("allAccounts", "");
  }

}
