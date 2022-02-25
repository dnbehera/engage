import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoditAngularModule } from 'jodit-angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoditAngularModule,
    EmailPageRoutingModule
  ],
  declarations: [EmailPage]
})
export class EmailPageModule {}
