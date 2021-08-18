import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portfolio-project';

  loginFlag:boolean = false;
  registerFlag:boolean = true;
  portfolioFlag:boolean = true;

  clickLogin()
  {
    this.loginFlag = false;
    this.registerFlag = true;
    this.portfolioFlag = true;
  }

  clickRegister()
  {
    this.loginFlag = true;
    this.registerFlag = false;
    this.portfolioFlag = true;
  }

  clickPortfolio()
  {
    if(localStorage.getItem("loggedInUser") == "")
    {
      alert("You need to log in first!");
    }
    else
    {
    this.loginFlag = true;
    this.registerFlag = true;
    this.portfolioFlag = false;

    let user = localStorage.getItem("loggedInUser");
    }
  }

  clickLogout()
  {
    alert("Logged out User " + localStorage.getItem("loggedInUser") + ".");
    localStorage.setItem("loggedInUser", "");
  }
}
