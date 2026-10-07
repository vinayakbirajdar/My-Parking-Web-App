import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { PrivacySecurityComponent } from './privacy-security/privacy-security.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';

/**
 * Account & settings feature routes.
 */
export const ACCOUNT_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'privacySecurity', component: PrivacySecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent }
];
