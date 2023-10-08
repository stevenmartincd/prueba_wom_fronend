import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components

import { MenuComponent } from './menu/menu.component';

// external
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';

import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TaskComponent} from "./task/tasks/task.component";
import { AddTaskComponent } from './task/task-create/task-create.component';
import { TaskModalComponent } from './task/task-modal/task-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    TaskComponent, AddTaskComponent, TaskModalComponent,
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        SweetAlert2Module.forRoot(),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
