import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-deletecontact',
  templateUrl: './deletecontact.component.html',
  styleUrls: ['./deletecontact.component.css']
})
export class DeletecontactComponent implements OnInit {

  deleteForm: FormGroup;
  deleted:boolean=false;
  constructor(private restService:RestServiceService, private router:Router,private route:ActivatedRoute) {  }

  ngOnInit(): void {
    this.deleteForm= new FormGroup({
      id:new FormControl(this.route.snapshot.paramMap.get('id'))});

  }
  deleteContact(){
    if(confirm("Are you sure?")){
    this.deleted=true;
    this.restService.delete(this.deleteForm.get('id').value).subscribe(data => {
      if(data){
        this.router.navigateByUrl('/getResults');
      }
      else{
        
      }
    });
  }

}
}
