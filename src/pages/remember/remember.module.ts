import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RememberPage } from './remember';

@NgModule({
  declarations: [
    RememberPage,
  ],
  imports: [
    IonicPageModule.forChild(RememberPage),
  ],
})
export class RememberPageModule {}
