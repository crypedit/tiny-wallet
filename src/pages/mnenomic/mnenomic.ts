import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MnenomicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mnenomic',
  segment: 'mnenomic'
})
@Component({
  selector: 'page-mnenomic',
  templateUrl: 'mnenomic.html',
})
export class MnenomicPage {
  mnenomic: string = 'prison swift chicken evolve ride invite wrap future few similar sing ocean';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.showAlert()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MnenomicPage');
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '请勿截图',
      subTitle: '如果有人获取你的助记词将直接获取你的资产！请抄写下助记词并存放到安全的地方',
      buttons: ['确认']
    });
    alert.present();
  }

}
