import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-main',
  templateUrl: './test-main.component.html',
  styleUrls: ['./test-main.component.css']
})

export class TestMainComponent implements OnInit {

  questionArray:any;

  correctQuestions:any = [];

  myForm:FormGroup;

  totalScore:number = 0;

  testOver:boolean = false;

  constructor(public http:HttpClient,public form:FormBuilder)
  {
    this.myForm=form.group({});
    for(let i = 1; i <= 10; i++)
      {
        this.myForm?.addControl(i.toString(), this.form.control(""));
      }
    this.getQuestions().subscribe(data => 
      {
        this.questionArray = data;
        console.log(this.questionArray);
        console.log("Printed the question array.");
      });
  }

  getQuestions():Observable<Question[]>
  {
    let temp = this.http.get<Question[]>('/assets/questions.json');
    return temp;
  }

  submit()
  {
    this.totalScore = 0;
    this.testOver = true;
    console.log(this.myForm);
    console.log(this.questionArray);
    console.log("Printed the question array.");
    for(let i = 0; i <= 9; i++)
    {
      console.log(this.questionArray[i]);
      if(this.myForm.get((i+1).toString())?.value == this.questionArray[i].correctAnswer)
      {
        this.totalScore++;
        this.correctQuestions[i] = true;
      }
      else
      {
        this.correctQuestions[i] = false;
      }
      console.log("The correct answer for question " + (i+1) +" was " + this.questionArray[i].correctAnswer);
    }
    console.log(this.totalScore);
  }

  ngOnInit(): void
  {
  }

}

export class Question
{
  constructor(public number:string, public question:string, public answer1:string, public answer2:string, public answer3:string, public answer4:string, public correctAnswer:string){}
}
