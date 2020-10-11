import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { ClientesModalComponent } from './clientes-modal/clientes-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClientesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
