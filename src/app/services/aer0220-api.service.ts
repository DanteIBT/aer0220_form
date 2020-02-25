import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  constructor(private http: HttpClient) {
    console.log('Aer0220ApiService Listo!!');
  }

  // Get catalog information
  getQuery( query: string) {

    const url = `http://localhost/aer0220_api/catalogues/${ query }`;

    return this.http.get( url );

  }

  getCities() {

    return this.getQuery('cities');

  }

  getGenders() {

    return this.getQuery('genders');

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

  // Insert student
  postInsert(userData: any) {

    return this.http.post('http://localhost/aer0220_api/students', userData );

  }


}
