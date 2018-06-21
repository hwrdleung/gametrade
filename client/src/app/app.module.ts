import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyTradesComponent } from './my-trades/my-trades.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from './data.service';
import { GamesDataService } from './games-data.service';
import { TradeService }  from './trade.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myGames', component: MyGamesComponent },
  { path: 'myTrades', component: MyTradesComponent },
  { path: 'profile/:username', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    MyGamesComponent,
    MyTradesComponent,
    ProfileComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [DataService, GamesDataService, TradeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
