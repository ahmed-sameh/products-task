import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { Interceptor } from './core/services/interceptor.service';
import { FloorPipe } from './core/pipes/floor.pipe';
import { CutStringsPipe } from './core/pipes/cut.strings.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    HomeComponent,
    ProductCardComponent,
    LoadSpinnerComponent,
    AlertComponent,
    FloorPipe,
    CutStringsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
