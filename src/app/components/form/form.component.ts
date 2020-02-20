import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent  {

  citiesList: any[] = [];
  relationshipList: any[] = [];
  gradesList: any[] = [];
  meetUsList: any[] = [];
  paymentTypeList: any[] = [];

  constructor(private aer0220: Aer0220ApiService) {

    this.aer0220.getCities()
        .subscribe ( ( data: any ) => { this.citiesList = data; });

    this.aer0220.getRelationships()
        .subscribe ( ( data: any ) => { this.relationshipList = data; });

    this.aer0220.getGrades()
        .subscribe ( ( data: any ) => { this.gradesList = data; });

    this.aer0220.getMeetUs()
        .subscribe ( ( data: any ) => { this.meetUsList = data; });

    this.aer0220.getPaymentTypes()
        .subscribe ( ( data: any ) => { this.paymentTypeList = data; });

  }

}
