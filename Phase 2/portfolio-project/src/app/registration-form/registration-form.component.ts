import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  msg:any = "";

  constructor() { }

  ngOnInit(): void {
  }

  register(registerRef:NgForm)
  {
    let registerForm = registerRef.value;
    console.log(registerForm);

    let account:any;
    if(registerForm.firstName != "" && registerForm.lastName != "" && registerForm.username != "" && registerForm.password != "")
    {
      account = {"firstName":registerForm.firstName, "lastName":registerForm.lastName, "username":registerForm.username,"password":registerForm.password};
      
      let accountString:string = JSON.stringify(account);

      let allAccounts:any = ""
      if(localStorage.getItem("allAccounts") != null)
      {
       allAccounts = localStorage.getItem("allAccounts");
      }
    

      allAccounts = allAccounts + accountString + "|?";

     localStorage.setItem("allAccounts", allAccounts);

      console.log(allAccounts);

      this.msg = "Account Created Successfully with Username " + registerForm.username + "!";

    }
    else
    {
      alert("All registration fields must be filled!");
    }

    
  }

  
}
