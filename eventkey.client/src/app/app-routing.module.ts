import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { EventManagerDashboardComponent } from './dashboard/event-manager-dashboard/event-manager-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EventApprovalComponent } from './admin/event-approval/event-approval.component';
import { RevenueReportsComponent } from './admin/revenue-reports/revenue-reports.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'event-manager-dashboard', component: EventManagerDashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'event-approval', component: EventApprovalComponent },
      { path: 'revenue-reports', component: RevenueReportsComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'promotions', component: PromotionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
