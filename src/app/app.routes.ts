import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    // AUTH LAYOUT
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' } // ✅ IMPORTANT
        ]
    },
    // MAIN LAYOUT
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent }
        ]
    },
    // FALLBACK
    { path: '**', redirectTo: 'login' }
];