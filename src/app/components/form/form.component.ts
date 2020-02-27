import { Component } from '@angular/core';
import { Aer0220ApiService } from '../../services/aer0220-api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


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

  pattern = '^[a-zA-ZñáéíóúÁÉÍÓÚ\s ]{2,150}';                            // Text
  patternCel = '[0-9]+';                                                 // Cel and phone number
  patternEmail = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$'; // Email

  constructor(private aer0220: Aer0220ApiService,  private router: Router, private fb: FormBuilder) {
    // View catalog information
    this.aer0220.getCities()
        .then ( ( data: any ) => { this.citiesList = data; });

    this.aer0220.getGenders()
        .then ( ( data: any ) => { this.genderList = data; });

    this.aer0220.getRelationships()
        .then ( ( data: any ) => { this.relationshipList = data; });

    this.aer0220.getGrades()
        .then ( ( data: any ) => { this.gradesList = data; });

    this.aer0220.getMeetUs()
        .then ( ( data: any ) => { this.meetUsList = data; });

    this.aer0220.getPaymentTypes()
        .then ( ( data: any ) => { this.paymentTypeList = data; });

    // Call Form Group
    this.createForm();

  }

  // Form validation
  get invalidName() {
    return this.userData.get('name').invalid && this.userData.get('name').touched;
  }
  get invalidNamePaternal() {
    return this.userData.get('name_paternal').invalid && this.userData.get('name_paternal').touched;
  }
  get invalidNameMaternal() {
    return this.userData.get('name_maternal').invalid && this.userData.get('name_maternal').touched;
  }
  get invalidCurp() {
    return this.userData.get('curp').invalid && this.userData.get('curp').touched;
  }
  get invalidAllergies() {
    return this.userData.get('allergies').invalid && this.userData.get('allergies').touched;
  }
  get invalidTutorName() {
    return this.userData.get('father_name').invalid && this.userData.get('father_name').touched;
  }
  get invalidEmail() {
    return this.userData.get('email').invalid && this.userData.get('email').touched;
  }
  get invalidEmail2() { // Validate that the emails are the same
    const email  = this.userData.get('email').value;
    const email2 = this.userData.get('email2').value;

    return (email === email2) ? false : true;
  }
  get invalidWhatsapp() {
    return this.userData.get('whatsapp').invalid && this.userData.get('whatsapp').touched;
  }
  get invalidHomePhone() {
    return this.userData.get('home_phone').invalid && this.userData.get('home_phone').touched;
  }
  get invalidOriginSchool() {
    return this.userData.get('origin_school').invalid && this.userData.get('origin_school').touched;
  }


  createForm() {
    this.userData = this.fb.group({
      name            : ['', [Validators.required, Validators.pattern(this.pattern)]],
      name_paternal   : ['', [Validators.required, Validators.pattern(this.pattern)]],
      name_maternal   : ['', [Validators.required, Validators.pattern(this.pattern)]],
      curp            : ['', Validators.required],
      birth_date      : ['', Validators.required],
      allergies       : ['', Validators.required],
      father_name     : ['', [Validators.required, Validators.pattern(this.pattern)]],
      email           : ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      email2          : ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      whatsapp        : ['', [Validators.required, Validators.pattern(this.patternCel)]],
      home_phone      : ['', [Validators.required, Validators.pattern(this.patternCel)]],
      origin_school   : ['', Validators.required],
      grade_id        : ['', Validators.required],
      meet_us_id      : ['', Validators.required],
      relationship_id : ['', Validators.required],
      gender_id       : ['', Validators.required],
      city_id         : ['', Validators.required],
      payment_types_id: ['', Validators.required]
    });
  }

  // Send information
  saveChanges() {

    this.aer0220.postInsert(this.userData.value)
    .then ( ( data: any ) => {
      // this.router.navigateByUrl('/ticket');
    }, (err) => {
      console.log(err);

    });
  }

}
