import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';


export const ROUTES: Routes = [
    { path: 'form', component: FormComponent },
    { path: '', pathMatch: 'full', redirectTo: 'form' },
    { path: '**', pathMatch: 'full', redirectTo: 'forms' }
];
