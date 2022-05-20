import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Contact } from '../Contact';
import { Contacts } from '../Contacts';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-getsingle',
  templateUrl: './getsingle.component.html',
  styleUrls: ['./getsingle.component.css']
})
export class GetsingleComponent implements OnInit {

  singleForm: FormGroup;
  contact:Contact;
  updatePressed:boolean=false;
  isNotNull:boolean=false;

  constructor(private restService:RestServiceService, private router:Router ,private route:ActivatedRoute) {  }

  ngOnInit(): void {
    
    this.singleForm= new FormGroup({
      id:new FormControl('')});
      if(this.route.snapshot.paramMap.has('id')){
      const id= Number(this.route.snapshot.paramMap.get('id'));
      if(id!==null){
        this.getSingleRouted(id);
      }
      }

      
    
  }

  getSingleRouted(id:number){
    this.updatePressed=true;
    this.isNotNull=true;
    this.restService.getSingle(id).subscribe(
      (response:Contact)=> {
        this.contact=response;
      
    
      }
    );
}

  



  getSingle(){
    if(this.singleForm.get('id').value){
      this.isNotNull=true;
      
    }
    else{
      return;
    }
    
    this.updatePressed=true;
    
    this.restService.getSingle(this.singleForm.get('id').value).subscribe(
      (response:Contact)=> {
        this.contact=response;
      
    
      }
    );
}

}
