import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../Contact';
import { RestServiceService } from '../rest-service.service';
import { UpdatePayload } from '../update.payload';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit {


  updateForm: FormGroup;
  updatePayload:UpdatePayload;
  contact:Contact;
  constructor(private restService:RestServiceService,private router:Router,private route:ActivatedRoute) {
    this.updatePayload={
      id:null,
      firstName:'',
      lastName:'',
      companyId:0,
      email:'',
      phoneNumber:'',
      comment:''
    }
   }


  ngOnInit(): void {
    this.updateForm= new FormGroup({
      id:new FormControl(this.route.snapshot.paramMap.get('id')),
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      companyId:new FormControl(null),
      email:new FormControl(''),
      phoneNumber:new FormControl(''),
      comment:new FormControl(''),
    })
  }

  update(){
    this.updatePayload.id=this.updateForm.get('id').value;
    this.updatePayload.firstName=this.updateForm.get('firstName').value;
    this.updatePayload.lastName=this.updateForm.get('lastName').value;
    this.updatePayload.companyId=this.updateForm.get('companyId').value;
    this.updatePayload.email=this.updateForm.get('email').value;
    this.updatePayload.phoneNumber=this.updateForm.get('phoneNumber').value;
    this.updatePayload.comment=this.updateForm.get('comment').value;
    
    
    this.restService.update(this.updatePayload).subscribe(data => {


      this.contact=data;

      if(data){
        this.router.navigateByUrl('/getSingle/'+this.contact.id);
      }
      else{
        
      }
    });

  }

}
