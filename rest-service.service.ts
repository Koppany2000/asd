import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from './Contacts';
import { PostPayload } from './post.payload';
import { UpdatePayload } from './update.payload';
import { Contact } from './Contact';
import { Graphql } from './Graphql';
import { GraphResponse } from './GraphResponse';
import { Contactsreturned } from './Contactsreturned';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private httpClient: HttpClient ) { }



  get(id:number):Observable<Contactsreturned>{
    return this.httpClient.get<Contactsreturned>('http://localhost:8080/api/contacts/?pageNo='+id);
  }
  post(postPayload:PostPayload): Observable<Contact>{
    return this.httpClient.post<Contact>('http://localhost:8080/api/contacts/',postPayload);
  }
  update(updatePayload:UpdatePayload): Observable<Contact>{
    return this.httpClient.put<Contact>('http://localhost:8080/api/contacts/'+updatePayload.id,updatePayload);
  }
  delete(id:number): Observable<boolean>{
    return this.httpClient.delete<boolean>('http://localhost:8080/api/contacts/'+id);
  }
  getSingle(id:number): Observable<Contact>{
    return this.httpClient.get<Contact>('http://localhost:8080/api/contacts/'+id);
  }
  getGraphQL(graphql:Graphql): Observable<GraphResponse>{
    return this.httpClient.post<GraphResponse>('http://localhost:8080/rest/contacts',graphql,{headers: new HttpHeaders({ 'Content-Type':'text/plain'})});
  }
  getBySearch(search:string):Observable<Contactsreturned>{
    return this.httpClient.get<Contactsreturned>('http://localhost:8080/api/contacts/search/?pageNo='+search);
  }
  getByCompany(search:string):Observable<Contactsreturned>{
    return this.httpClient.get<Contactsreturned>('http://localhost:8080/api/contacts/companySearch/?pageNo='+search);
  }

  getBySearchAndCompany(search:string):Observable<Contactsreturned>{
    return this.httpClient.get<Contactsreturned>('http://localhost:8080/api/contacts/search2/?pageNo='+search);
  }
  
  
  

}


