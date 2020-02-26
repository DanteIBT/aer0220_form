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

    // Call group form
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
      name            : ['Dante', [Validators.required, Validators.pattern(this.pattern)]],
      name_paternal   : ['Barreda', [Validators.required, Validators.pattern(this.pattern)]],
      name_maternal   : ['Tovar', [Validators.required, Validators.pattern(this.pattern)]],
      curp            : ['BATD960401HPLRVN07', [Validators.required]],
      birth_date      : ['1996-04-01', Validators.required],
      allergies       : ['Ninguna', Validators.required],
      father_name     : ['Raul barreda Avila', [Validators.required, Validators.pattern(this.pattern)]],
      email           : ['learsi6474@hotmail.com', [Validators.required, Validators.pattern(this.patternEmail)]],
      email2          : ['learsi6474@hotmail.com', [Validators.required, Validators.pattern(this.patternEmail)]],
      whatsapp        : ['2228073873', [Validators.required, Validators.pattern(this.patternCel)]],
      home_phone      : ['2228073873', [Validators.required, Validators.pattern(this.patternCel)]],
      origin_school   : ['BUAP', Validators.required],
      grade_id        : ['1', Validators.required],
      meet_us_id      : ['1', Validators.required],
      relationship_id : ['1', Validators.required],
      gender_id       : ['1', Validators.required],
      city_id         : ['4', Validators.required],
      payment_types_id: ['1', Validators.required]
    });
  }

  // Send information
  saveChanges() {
    // console.log(this.userData);
    // console.log(this.userData.value);

    this.aer0220.postInsert(this.userData.value)
    .subscribe ( ( data: any ) => {
      // this.router.navigateByUrl('/ticket');
    }, (err) => {
      console.log(err);

    });
  }

}
