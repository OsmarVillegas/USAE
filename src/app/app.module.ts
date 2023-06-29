import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { Form2Component } from './form/form2.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Form2Component,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 6,
      preventDuplicates: true,
    }),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-6u46zsblfibecxhy.us.auth0.com',
      clientId: 'E9wJUyuiznYjVgHBbhJ2NlGA8rfS7JDJ',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
