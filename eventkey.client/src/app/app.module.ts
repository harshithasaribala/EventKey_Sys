import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AboutComponent } from './pages/about/about.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { EventManagerDashboardComponent } from './dashboard/event-manager-dashboard/event-manager-dashboard.component';
import { EventApprovalComponent } from './admin/event-approval/event-approval.component';
import { RevenueReportsComponent } from './admin/revenue-reports/revenue-reports.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { EventCreationComponent } from './eventManager/event-creation/event-creation.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminDashboardComponent
  ],
  declarations: [
    AppComponent,           
    HomeComponent,          
    LoginComponent,
    SignUpComponent,
    AdminLoginComponent,
    AboutComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    EventManagerDashboardComponent,
    EventApprovalComponent,
    RevenueReportsComponent,
    ManageUsersComponent,
    PromotionsComponent,
    EventCreationComponent
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    AdminLoginComponent
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
