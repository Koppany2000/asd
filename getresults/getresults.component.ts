import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import { Contacts } from '../Contacts';
import { Contactsreturned } from '../Contactsreturned';
import { RestServiceService } from '../rest-service.service';


@Component({
  selector: 'app-getresults',
  templateUrl: './getresults.component.html',
  styleUrls: ['./getresults.component.css']
})
export class GetresultsComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  dataSource:Contacts[];
  @Input() data:string="";
  @Input() data2:string="";
  updatePressed:boolean=false;
  searchbyname:boolean=false;
  event2:string="";
  companysearch:string="0";
  namesearch:string="";
  contacts:Contacts[];
  contacts2:Contactsreturned;
  getresultsForm:FormGroup;
  displayedColumns: string[] = ['id'];
  id:number=0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private restService:RestServiceService,private router:Router) { }

  sortedData:Contacts[];
  ngOnInit(): void {
    this.getresultsForm= new FormGroup({
      id:new FormControl('')});
      this.getResults();

    
  }
 
  getResults(){
    this.updatePressed=true;
    this.id=this.getresultsForm.get('id').value;
    this.restService.get(this.id).subscribe(data => {
      this.contacts2=data;
      
      
      if(data){
        this.router.navigateByUrl('/getResults');
      }
      else{
      }
    });
}

search(event:string){
  this.namesearch=event;
  if(this.companysearch=="0"){
  this.paginator.pageIndex=0;
  this.event2=event;
  if(this.event2!=""){
  this.searchbyname=true;
  }
  else{
    this.searchbyname=false;
  }
 this.restService.getBySearch(event+",0").subscribe(data =>{
  this.contacts2=data;
  if(data){
    this.router.navigateByUrl('/getResults');
  }
  else{
  }
}
 );}
 else{
  this.restService.getBySearchAndCompany(event+",0,"+this.companysearch).subscribe(data =>{
    this.contacts2=data;
    if(data){
      this.router.navigateByUrl('/getResults');
    }
    else{
    }
  }
   );
   
   
   
 }
  

}
searchCompany(event:string){
  if(this.namesearch==""){
  this.companysearch=event;
  this.paginator.pageIndex=0;
  if(event!="0")
  {
  this.event2=event;
  this.restService.getByCompany(event+",0").subscribe(data =>{
    this.contacts2=data;
    this.dataSource=this.contacts;
    if(data){
      this.router.navigateByUrl('/getResults');
    }
    else{
    }
  }
   );
}else{
  this.getResults();
}}
else{
  this.restService.getBySearchAndCompany(this.namesearch+",0,"+event).subscribe(data =>{
    this.contacts2=data;
    this.dataSource=this.contacts;
    if(data){
      this.router.navigateByUrl('/getResults');
    }
    else{
    }
  }
   );

}

}

onPaginateChange(event){
  if(this.event2!="" && this.searchbyname==true){
  
 this.restService.getBySearch(this.event2+","+event.pageIndex).subscribe(data =>{
  this.contacts2=data;
  this.dataSource=this.contacts;
  if(data){
    this.router.navigateByUrl('/getResults');
  }
  else{
  }
}
 );
  }
  else if(this.event2!=""){
    if(this.event2!="0")
  {
  this.restService.getByCompany(this.event2+","+event.pageIndex).subscribe(data =>{
    this.contacts2=data;
    this.dataSource=this.contacts;
    if(data){
      this.router.navigateByUrl('/getResults');
    }
    else{
    }
  }
   );
}else{
  this.getResults();
}

  }
  
  
  
  
  else{
  this.id=event.pageIndex;
  this.restService.get(this.id).subscribe(data => {
    this.contacts2=data;
    this.dataSource=this.contacts;
    if(data){
      this.router.navigateByUrl('/getResults');
    }
    else{
    }
  });
}

}}

