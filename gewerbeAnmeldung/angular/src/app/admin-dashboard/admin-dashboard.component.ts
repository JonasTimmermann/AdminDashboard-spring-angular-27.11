import { Component, OnInit } from '@angular/core';
import {HttpRequestService} from '../http-request.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {




  url = 'http://localhost:8080/frage';
  //url2 = 'kp';
  deleteId: number = -1;
  url2 = 'http://localhost:8080/frage/' + this.deleteId;

  url3 = 'http://localhost:8090/frage';

  urlAdd = 'http://localhost:8090/frage/add';
  
  urlById: number = -1;
  urlGetbyId = 'http://localhost:8090/frage/' + this.urlById;

  formType: string = ""; 
  urlFormType = 'http://localhost:8090/type/' + this.formType;

  editId: number = -1;
  urlEdit: string = 'http://localhost:8090/frage/' + this.editId + '/edit';


  deleteIdQuestion = -1;
  urlDelete = 'http://localhost:8090/frage/' + this.deleteIdQuestion + '/delete';



  chosenFormType: string = "";


  public data: any;

  public dataOne: any;
  byIdOn: boolean = false;

  public data4: any;


  public dataDisplay: any;




names: String[] = ["Emil", "Tobias", "Linus"];

selectedValue:string = "";
selectedValueKat:string = "";

kat: Kategorien[] = [];

antwortMoeglichkeiten: Kategorien[] = [];

radioOn: boolean = false;
CheckOn: boolean = false;
TextOn: boolean = false;
TextCheckOn: boolean = false;

isEdit:boolean = false;
deleteOn:boolean = false;


antOpAnzahl: number = 1;




fakeArray = new Array(this.antOpAnzahl);

realArray = new Array<String>(this.fakeArray.length);


fakeChoiceArray = new Array(this.antOpAnzahl);

choiceArray = new Array<Choices>(this.fakeChoiceArray.length);


choiceExample: Choices = {id: 0, choice: "", questionType: null};


antOpString: string = "";



getQuestionByIdList: number[];



// frage: Frage = {id: 1, frage: "Familienstand?", kategorie: "Neugründung", antwortTyp: "RadioButton", antwortOptionen:"ledig;verheiratet;verwitwet", hinweis: "Familienstatus eintragen"};
frage: Frage = {id: 1, frage: "", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};

question: Question = {id: 0, question: "Was ist dein Alter", questionType: null, hint: "no Hinweis", formType: "Gewerbe", questionCategory: null};

choices: Choices = {id: 0, choice: "u18", questionType: null};
choices2: Choices = {id: 1, choice: "ü18", questionType: null};

chArray: Choices[] = [this.choices];
quArray: Question[] = [this.question];

questionType: QuestionType = {id: 0, type: "RadioButton", choices: this.chArray, question: this.question };

questionCategory: QuestionCategory = {id: 0, category: "Allgemein", questions: this.quArray, processNumber: 1};



qtArray: QuestionType[] = [this.questionType];
qcArray: QuestionCategory[] = [this.questionCategory];









confirm: string = "";


currentId:number = 0;

check:boolean = false;




constructor(private api: HttpRequestService) { }



  ngOnInit() {

this.kat = [{id: 1, name: "Neu"},{id: 2, name: "Wieder"},{id: 3, name: "Alt"}];

this.antwortMoeglichkeiten = [{id: 1, name: "Text-Eingabe"},{id: 2, name: "RadioButton"},{id: 3, name: "Checkbox"}, {id: 4, name: "Text u. Checkbox"}];
this.selectedValue = "Moin";

this.antOpAnzahl = 1;

this.frage = {id: 1, frage: "Frage eingeben", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};








this.choices = {id: 0, choice: "under18", questionType: this.qtArray};
this.choices2 = {id: 1, choice: "over18", questionType: this.qtArray};
this.chArray = [this.choices, this.choices2];

this.quArray = [this.question];

this.questionType = {id: 0, type: "RadioButton2", choices: this.chArray, question: this.question };
this.questionCategory= {id: 0, category: "Allgemeines", questions: this.quArray, processNumber: 1};



this.qtArray = [this.questionType];
this.qcArray = [this.questionCategory];

this.question = {id: 2, question: "dein Alter hier eintragen", questionType: this.questionType, hint: "no Hinweis vorhanden", formType: "Gewerbean u. umeldung", questionCategory: this.qcArray};




this.dataOne = this.question;



/** 
this.api
.getFrage(this.url)
.subscribe(
  data => {
    console.log(data);
    this.data = data;
  },
  err => {
    console.log(err);
  }
);
 **/

this.api
.getQuestion(this.url3)
.subscribe(
  dataDisplay => {
    console.log(dataDisplay);
    this.dataDisplay = dataDisplay;
    this.data = dataDisplay;
  },
  err => {
    console.log(err);
  }
);


/** 
for(let i = 0; i < this.data.length; i++){
  this.getQuestionByIdList.push(this.data[i].id);
}
**/


}




//id: Kategorien

  toggleEdit(){


    if(this.question.questionType.type == "RadioButton"){
      console.log("ok worked")
      this.radioOn = true;
    }else{
      this.radioOn = false;
    }

    if(this.question.questionType.type == "Checkbox"){
      console.log("ok worked")
      this.CheckOn = true;
    }else{
      this.CheckOn = false;
    }

    if(this.question.questionType.type == "Text-Eingabe"){
      console.log("ok worked")
      this.TextOn = true;
    }else{
      this.TextOn = false;
    }

    if(this.question.questionType.type == "Text u. Checkbox"){
      console.log("ok worked")
      this.TextCheckOn = true;
    }else{
      this.TextCheckOn = false;
    }


      
    
      //this.isEdit = !this.isEdit;
      //getted from event
     // console.log(id);
      console.log(this.frage.antwortTyp);
      //getted from binding
   
    
  }



  loadQuestion(question: any): void {
    
    console.log("Click worked" + question.id);

    this.deleteIdQuestion = question.id;  
    this.deleteOn = true;


    this.question.question = question.question;
    this.question.id = question.id;
    this.question.hint = question.hint;
    this.question.questionType = question.questionType;
    this.question.questionCategory = question.questionCategory;
    this.question.formType = question.formType;

    this.toggleEdit();
    
    this.choiceArray = question.questionType.choices;


    console.log(this.choiceArray);

    this.fakeChoiceArray = new Array(this.choiceArray.length);

  }



/** 
  myClick(id:any): void {
    
    console.log("Click worked" + id.id);

    this.deleteId = id.id;  
    this.deleteOn = true;

    this.frage.id = id.id;
    this.frage.frage = id.frage;
    this.frage.kategorie = id.kategorie;
    this.frage.antwortTyp = id.antwortTyp;
    this.frage.antwortOptionen = id.antwortOptionen;
    this.toggleEdit();
    

    this.realArray = id.antwortOptionen.split(";");
    

    console.log(this.realArray);

    this.fakeArray = new Array(this.realArray.length);
    this.frage.hinweis = id.hinweis;



    
   
   // var myTable = document.getElementById('tabId');
   // myTable.style.backgroundColor = 'Red';


  }
    





deleteFrage(): void{

  this.url2 = 'http://localhost:8080/frage/' + this.deleteId;


  this.api.deleteFrage(this.deleteId, this.url2).subscribe(data => data => {console.log(data);this.data = data;},err => {console.log(err);});



  this.api
  .getFrage(this.url)
  .subscribe(
    data => {
      console.log(data);
      this.data = data;
    },
    err => {
      console.log(err);
    }
  );


  this.deleteOn = false;
  this.deleteId = -1;

  location.reload();


}
 **/


createQuestion(): void{


  this.api
.getQuestion(this.url3)
.subscribe(
  data => {
    console.log(data);
    this.data = data;
    this.dataDisplay = data;
  },
  err => {
    console.log(err);
  }
);



  //Change Frage
  if(this.data.length > 0){

    for(let t = 0; t < this.data.length; t++){
      
      if(this.data[t].id == this.question.id){
        
        console.log("Entry changed!!!");



        this.editId = this.question.id;
        this.urlEdit = 'http://localhost:8090/frage/' + this.editId + '/edit';
      
        this.api.editQuestion(this.urlEdit, this.question, this.editId).subscribe(data => {console.log(data);this.data = data; this.dataDisplay = data;},err => {console.log(err);});


        this.check = true;

      }

    }

  }




if(!this.check){
  if(this.data.length > 0){  
    this.currentId = this.data[this.data.length -1].id + 1;
    this.question.id = this.currentId;
  }else{
    this.question.id = 1;
  }
//this.frage.antwortTyp = this.selectedValue;
//this.frage.kategorie = this.selectedValueKat;


//this.person.id = this.data[this.data.length - 1].id + 1;
    console.log(this.question);
    this.api.addQuestion(this.question, this.urlAdd).subscribe( data => data=> {console.log(data);this.data = data; this.dataDisplay = data;}, err => {console.log(err);});

  }



location.reload();


}





getAllQuestion(): void {

  this.api.getQuestion(this.url3).subscribe(data => {console.log(data);this.data = data; this.dataDisplay = data},err => {console.log(err);});
  
}




getQuestionById(): void {
  
  let zw: boolean = false;
  for(let i = 0; i < this.data.length; i++){
      
     if(this.urlById == this.data[i].id){
        zw = true;  
     }
  }

  if(zw){
    this.urlGetbyId = 'http://localhost:8090/frage/' + this.urlById;

    this.api.getQuestionbyId(this.urlGetbyId).subscribe(dataOne => {console.log(dataOne);this.dataOne = dataOne;},err => {console.log(err);});
  
    this.byIdOn = true;
  }
}



getFormType(): void{

  let zw: boolean = false;

  for(let i = 0; i < this.data.length; i++) {
      
     if(this.chosenFormType == this.data[i].formType){
        zw = true;  
     }
  }

  if(zw){

    this.formType = this.chosenFormType;
    this.urlFormType = 'http://localhost:8090/type/' + this.formType;

    this.api.getFormType(this.urlFormType).subscribe(data4 => {console.log(data4);this.data4 = data4;this.dataDisplay = data4;},err => {console.log(err);});

    
  }

  

}

editQuestion(): void{

  this.editId = this.question.id;
  this.urlEdit = 'http://localhost:8090/frage/' + this.editId + '/edit';

  this.api.editQuestion(this.urlEdit, this.question, this.editId).subscribe(data => {console.log(data);this.data = data;this.dataDisplay = data;},err => {console.log(err);});
  

  location.reload();
}


deleteQuestion(): void{

this.deleteIdQuestion = 4; // this.question.id;
this.urlDelete = 'http://localhost:8090/frage/' + this.deleteIdQuestion + '/delete';

this.api.deleteQuestion(this.urlDelete, this.deleteIdQuestion).subscribe(data => data => {console.log(data);this.data = data; this.dataDisplay = data;},err => {console.log(err);});



this.deleteIdQuestion = -1;
this.deleteOn = false;

location.reload();

}








  
createFrage(): void {

 
    this.api
      .getFrage(this.url)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        err => {
          console.log(err);
        }
      );



      //Change Frage
      if(this.data.length > 0){

        for(let t = 0; t < this.data.length; t++){
          
          if(this.data[t].id == this.frage.id){
            
            console.log("Entry changed!!!");

           
            for(let u2 = 0; u2 < this.realArray.length; u2++){

              this.antOpString += this.realArray[u2];

              if(u2 < this.realArray.length -1){
                this.antOpString += ";";
              }
          }
          this.frage.antwortOptionen = this.antOpString;



          this.api.updateFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});


            this.check = true;

          }

        }

      }




if(!this.check){
      if(this.data.length > 0){  
        this.currentId = this.data[this.data.length -1].id + 1;
        this.frage.id = this.currentId;
      }else{
        this.frage.id = 1;
      }
    //this.frage.antwortTyp = this.selectedValue;
    //this.frage.kategorie = this.selectedValueKat;


    for(let u = 0; u < this.realArray.length; u++){

        this.antOpString += this.realArray[u];
        if(u < this.realArray.length -1){
          this.antOpString += ";";
        }
    }

    this.frage.antwortOptionen = this.antOpString;
    //this.person.id = this.data[this.data.length - 1].id + 1;
    this.api.createFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});
      

}

location.reload();


   // this.confirm = this.frage.frage + "   --> wurde hinzugefügt";    

  };



/** 

  deletePerson(dId: number): void {
    this.url2 = 'http://localhost:8080/person/' + this.deleteId;
    this.api.deletePerson(dId, this.url2).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };


  updatePerson(): void {
    this.api.updatePerson(this.personUp, this.url).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };

**/



  addInput(){

    let ch: Choices = {id: 0, choice: "", questionType: null};

    this.antOpAnzahl += 1;
   // this.fakeArray = new Array(this.antOpAnzahl); 
    //this.fakeChoiceArray.push(this.antOpAnzahl);
    this.fakeChoiceArray = new Array(this.antOpAnzahl);

    //this.choiceArray.push(null);

    //this.choiceArray[this.choiceArray.length - 1].questionType = this.qtArray;

    ch.questionType = this.qtArray;

    if(this.choiceArray.length > 0){
      //this.choiceArray[this.choiceArray.length - 1].id = this.choiceArray[this.choiceArray.length - 2].id + 1;
      ch.id = this.choiceArray[this.choiceArray.length - 1].id + 1;
    }else{
      ch.id = 0;
      //this.choiceArray[this.choiceArray.length - 1].id = 0;
    }
      
    this.choiceArray.push(ch);
    

   
    console.log(this.choiceArray);
  }



  deleteInput(){

    if(this.antOpAnzahl > 0){
      this.antOpAnzahl -= 1;
      this.fakeChoiceArray = new Array(this.antOpAnzahl); 
      this.choiceArray.pop();
  }
  }







}



interface QuestionType{

id:number,
type:string,
choices:Array<Choices>,
question:Question

}


interface QuestionCategory{

id:number,
category:string,
questions:Array<Question>,
processNumber:number

}


interface Choices{

id:number,
choice:string,
questionType:Array<QuestionType>

}


interface Question{

id:number,
question:string,
questionType:QuestionType,
hint:string,
formType:string,
questionCategory:Array<QuestionCategory>


}





interface Frage{
   
  id:number,
  frage:string,
  kategorie:string,
  antwortTyp:string,
  antwortOptionen:String,
  hinweis:string

}



interface Kategorien{
   
  id:number,
  name:string

}
