
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_modules/login/index';
   
import { AuthGuard } from './_shared/guards/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
     { path: 'login', component: LoginComponent },

 


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);