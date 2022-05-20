import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from '../Data';
import { Graphql } from '../Graphql';
import { GraphResponse } from '../GraphResponse';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css']
})
export class GraphqlComponent implements OnInit {

  graphForm: FormGroup;
  buttonPressed:boolean=false;

  graphresponse:GraphResponse;
  graphdata:Data;
  graph:Graphql;
  constructor(private restService:RestServiceService, private router:Router) { }

  ngOnInit(): void {

    this.graphForm= new FormGroup({
      query:new FormControl('')});
  }


  getGraphQL(){
    this.buttonPressed=true;

    this.restService.getGraphQL(this.graphForm.get('query').value).subscribe(
      (response:GraphResponse)=> {
        
        this.graphresponse=response;
      
        
    
      }
      
    );
    
   
   

    
}

}
