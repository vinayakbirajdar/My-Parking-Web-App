import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { WalletComponent } from './screens/wallet/wallet.component';
import { PrivacySecurityComponent } from './screens/privacy-security/privacy-security.component';
import { HelpComponent } from './screens/help/help.component';
import { AboutComponent } from './screens/about/about.component';

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
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'wallet', component: WalletComponent },
            { path: 'privacySecurity', component: PrivacySecurityComponent },
            { path: 'help', component: HelpComponent },
            { path: 'about', component: AboutComponent }
        ]
    },
    // FALLBACK
    { path: '**', redirectTo: 'login' }
];