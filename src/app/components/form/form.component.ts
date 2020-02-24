import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent  {

  citiesList: any[] = [];
  genderList: any[] = [];
  relationshipList: any[] = [];
  gradesList: any[] = [];
  meetUsList: any[] = [];
  paymentTypeList: any[] = [];

  userData: FormGroup;

  pattern = '^[a-zA-ZñáéíóúÁÉÍÓÚ\s ]{2,100}';    // Text
  patternCel = '[0-9]+';                         // Cel and phone number
  patternCurp = '{18,18}';                       // curp

  constructor(private aer0220: Aer0220ApiService,  private router: Router) {

    this.aer0220.getCities()
        .subscribe ( ( data: any ) => { this.citiesList = data; });

    this.aer0220.getGenders()
        .subscribe ( ( data: any ) => { this.genderList = data; console.log(this.genderList);});

    this.aer0220.getRelationships()
        .subscribe ( ( data: any ) => { this.relationshipList = data; });

    this.aer0220.getGrades()
        .subscribe ( ( data: any ) => { this.gradesList = data; });

    this.aer0220.getMeetUs()
        .subscribe ( ( data: any ) => { this.meetUsList = data; });

    this.aer0220.getPaymentTypes()
        .subscribe ( ( data: any ) => { this.paymentTypeList = data; });

    this.userData = new FormGroup({
      'name': new FormControl('Dante', [Validators.required, Validators.pattern(this.pattern)]),
      'name_paternal': new FormControl('Barreda', [Validators.required, Validators.pattern(this.pattern)]),
      'name_maternal': new FormControl('Tovar', [Validators.required, Validators.pattern(this.pattern)]),
      'curp': new FormControl('BATD960401HPLRVN02', Validators.required),
      'birth_date': new FormControl('1996-04-01', Validators.required),
      'allergies': new FormControl('Ninguna', Validators.required),
      'father_name': new FormControl('Raul barreda Avila', Validators.required),
      'email': new FormControl('learsi6474@hotmail.com', Validators.required),
      'whatsapp': new FormControl('2228073873', [Validators.required, Validators.pattern(this.patternCel)]),
      'home_phone': new FormControl('2228073873', [Validators.required, Validators.pattern(this.patternCel)]),
      'origin_school': new FormControl('BUAP', Validators.required),
      'grade_id': new FormControl('1', Validators.required),
      'meet_us_id': new FormControl('1', Validators.required),
      'relationship_id': new FormControl('1', Validators.required),
      'gender_id': new FormControl('1', Validators.required),
      'city_id': new FormControl('4', Validators.required),
      'payment_types_id': new FormControl('2', Validators.required)

    });

  }

  saveChanges() {

    console.log(this.userData.value);

    this.aer0220.postInsert(this.userData.value)
    .subscribe ( ( data: any ) => {
      console.log('Redirigir', data);
      // this.router.navigateByUrl('/ticket');
    }, (err) => {
      console.log(err);

    });

  }


}
