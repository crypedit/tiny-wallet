import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TxPage } from './tx';

@NgModule({
  declarations: [
    TxPage,
  ],
  imports: [
    IonicPageModule.forChild(TxPage),
  ],
})
export class TxPageModule {}
