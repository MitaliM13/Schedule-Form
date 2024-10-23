import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ParentFormComponent } from './Components/Form/parent-form/parent-form.component';
import { StepThreeConfirmComponent } from './Components/Form/parent-form/step-three-confirm/step-three-confirm.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'form', component: ParentFormComponent },
  { path: 'step-three', component: StepThreeConfirmComponent }, // Add route for Step 3
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
