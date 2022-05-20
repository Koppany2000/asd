import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import { PostPayload } from '../post.payload';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-postcontact',
  templateUrl: './postcontact.component.html',
  styleUrls: ['./postcontact.component.css']
})
export class PostcontactComponent implements OnInit {


  postForm: FormGroup;
  postPayload:PostPayload;
  contact:Contact;

  constructor(private restService:RestServiceService,private router:Router ) { 
    this.postPayload={
      firstName:'',
      lastName:'',
      companyId:null,
      email:'',
      phoneNumber:'',
      comment:''
    }
  }

  ngOnInit(): void {
    this.postForm= new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      companyId:new FormControl(null),
      email:new FormControl(''),
      phoneNumber:new FormControl(''),
      comment:new FormControl(''),
    })
  }
  post(){
    this.postPayload.firstName=this.postForm.get('firstName').value;
    this.postPayload.lastName=this.postForm.get('lastName').value;
    this.postPayload.companyId=this.postForm.get('companyId').value;
    this.postPayload.email=this.postForm.get('email').value;
    this.postPayload.phoneNumber=this.postForm.get('phoneNumber').value;
    this.postPayload.comment=this.postForm.get('comment').value;
    
    
    this.restService.post(this.postPayload).subscribe(data => {
      if(data){
        this.contact=data;
       
        this.router.navigateByUrl('/getSingle/'+ this.contact.id);
      }
      else{
        
      }
    });

  }

}
