import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'src/app/app-routing.module';

// pages
import { ProjectsNewPage } from 'src/app/projects/new/new.component';

// component
import { AppComponent } from 'src/app/app.component';
import { PageComponent } from './shared/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsNewPage,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
