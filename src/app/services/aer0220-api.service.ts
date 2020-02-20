import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  constructor(private http: HttpClient) {
    console.log('Aer0220ApiService Listo!!');
  }


  getQuery( query: string) {

    const url = `http://localhost/aer0220_api/catalogues/${ query }`;

    return this.http.get( url );

  }

  getCities() {

    return this.getQuery('cities');

  }

  getRelationships() {

    return this.getQuery('relationships');

  }

  getGrades() {

    return this.getQuery('grades');

  }

  getMeetUs() {

    return this.getQuery('meet_us');

  }

  getPaymentTypes() {

    return this.getQuery('payment_types');

  }

}
