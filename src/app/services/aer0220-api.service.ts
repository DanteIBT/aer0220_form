import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Aer0220ApiService {

  constructor(private http: HttpClient) {}

  // Get catalog information
  getQuery( query: string) {

    const url = `http://localhost/aer0220_api/catalogues/${ query }`;

    return this.http.get( url ).toPromise();

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

    return this.http.post('http://localhost/aer0220_api/students', userData ).toPromise();

  }


}
