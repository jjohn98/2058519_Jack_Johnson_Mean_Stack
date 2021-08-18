import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  table:any;

  headers = ["Contact Name", "Contact Number"]
  
  userContacts:any = [];

  activeUser = localStorage.getItem("loggedInUser");


  constructor() { }

  ngOnInit(): void {
    this.activeUser = localStorage.getItem("loggedInUser");
  }

  addContact(portfolioRef:NgForm)
  {
    this.activeUser = localStorage.getItem("loggedInUser");

    let portfolioForm = portfolioRef.value;

    if(portfolioForm.contactName != "" && portfolioForm.contactNumber != "")
    {
      let newContact = {"Contact Name":portfolioForm.contactName, "Contact Number":portfolioForm.contactNumber};

      let newString = JSON.stringify(newContact);

      let loggedInUser = localStorage.getItem("loggedInUser");

      let storedContacts:any = "";

      if(localStorage.getItem(loggedInUser + "Contacts") != null)
      {
        storedContacts = localStorage.getItem(loggedInUser + "Contacts");
      }

      console.log(storedContacts);

      storedContacts = storedContacts + newString + "|?";

      localStorage.setItem(loggedInUser + "Contacts", storedContacts);

      this.loadContacts(portfolioRef);

      console.log(storedContacts);
    }
    else
    {
      alert("Please enter both the name and number of your contact.");
    }
  }

  loadContacts(portfolioRef:NgForm)
  {
    this.activeUser = localStorage.getItem("loggedInUser");

    let porfolioForm = portfolioRef.value;

    let loggedInUser = localStorage.getItem("loggedInUser");

    let storedContacts:any = "";

    if(localStorage.getItem(loggedInUser + "Contacts") != null)
    {
      storedContacts = localStorage.getItem(loggedInUser + "Contacts");
    }

    let contactArray = storedContacts.split("|?");

    let usercontacts = "";

    for(let i = 0; i < contactArray.length -1; i++)
    {
      let temp = JSON.parse(contactArray[i]);
      console.log(temp);

      this.userContacts[i] = temp;
    }
  }

  clearContacts()
  {
    let loggedInUser = localStorage.getItem("loggedInUser");

    localStorage.setItem(loggedInUser + "Contacts", "");

    this.userContacts = [];
  }

}
