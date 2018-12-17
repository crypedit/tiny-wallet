import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage({
  name: 'remember',
  segment: 'remember'
})
@Component({
  selector: 'page-remember',
  templateUrl: 'remember.html',
})
export class RememberPage {
  originalMnenomics: Array<string> = ['song', 'distance', 'own', 'erase', 'say', 'crash', 'volume', 'kid', 'either', 'napkin', 'ocean', 'olympic']
  unusedWords: Map<string, boolean> = new Map();
  orderingMnenomics: Array<string> = []
  set: Set<string> = new Set<string>()
  shuffledMnenomics: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.originalMnenomics = this.navParams.get('data') || this.originalMnenomics
    this.shuffledMnenomics = this.shuffle(this.originalMnenomics)
    this.unusedWords = this.originalMnenomics
      .map(word => [word, true] as [string, boolean])
      .reduce((mem, item) => mem.set(item[0], item[1]),
        new Map<string, boolean>())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberPage');
  }

  order(word: string) {
    if (this.set.has(word)) {
      return;
    }
    this.set.add(word)
    this.orderingMnenomics.push(word)
    this.unusedWords.set(word, false)
  }

  rm(word: string) {
    this.set.delete(word)
    this.orderingMnenomics = this.orderingMnenomics.filter((item) => item !== word)
    this.unusedWords.set(word, true)
  }

  shuffle<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
      throw new TypeError(`Expected an Array, got ${typeof array} instead.`);
    }

    const oldArray = [...array];
    let newArray = new Array<T>();

    while (oldArray.length) {
      const i = Math.floor(Math.random() * oldArray.length);
      newArray = newArray.concat(oldArray.splice(i, 1));
    }

    return newArray;
  }

  confirm() {
    console.log(this.originalMnenomics)
    console.log(this.orderingMnenomics)

    console.log(equals(this.originalMnenomics, this.orderingMnenomics))
    if (equals(this.originalMnenomics, this.orderingMnenomics)) {
      this.navCtrl.setRoot(HomePage)
      this.navCtrl.popToRoot()
    }
    function equals(left: Array[string], right: Array[string]) {
      if (left.length !== right.length) {
        return false;
      }
      return left
        .map((word, i) => word == right[i])
        .reduce((isEqual, match) => isEqual && match, true)
    }
  }
}
