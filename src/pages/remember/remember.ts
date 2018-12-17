import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { stringify } from '@angular/compiler/src/util';

@IonicPage({
  name: 'remember',
  segment: 'remember'
})
@Component({
  selector: 'page-remember',
  templateUrl: 'remember.html',
})
export class RememberPage {
  mnenomics: Array<string> = ['song', 'distance', 'own', 'erase', 'say', 'crash', 'volume', 'kid', 'either', 'napkin', 'ocean', 'olympic']
  unusedWords: Map<string, boolean> = new Map();
  orderingMnenomics: Set<string> = new Set<string>()

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.unusedWords = this.mnenomics
      .map(word => [word, true] as [string, boolean])
      .reduce((mem, item) => mem.set(item[0], item[1]),
        new Map<string, boolean>())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberPage');
  }

  order(word: string) {
    this.orderingMnenomics.add(word)
    this.unusedWords.set(word, false)
  }

  rm(word: string) {
    this.orderingMnenomics.delete(word)
    this.unusedWords.set(word, true)
  }

}
