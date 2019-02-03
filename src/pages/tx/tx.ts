import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import EthereumTx from 'ethereumjs-tx'
import Web3 from 'web3'
import { ApiProvider } from '../../providers/api/api'

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/53cca720707f40bd91bd166c011c7934'
  )
)

@IonicPage({
  name: 'tx',
  segment: 'tx'
})
@Component({
  selector: 'page-tx',
  templateUrl: 'tx.html'
})
export class TxPage {
  wallet: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private api: ApiProvider
  ) {
    this.wallet = this.formBuilder.group({
      walletName: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      confirmPass: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      hint: [''],
      termsAndCondition: [false, Validators.requiredTrue]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TxPage')
  }

  createTx() {
    const newtx = new EthereumTx({
      nonce: 0,
      gasPrice: 5000000000,
      gasLimit: 21000,
      to: '0x5c47e30dc7f82167de8865aac3914ce927c15918',
      value: 0.1,
      // EIP 155 chainId - mainnet: 1, ropsten: 3
      chainId: 3
    })
    const privateKey = Buffer.from(
      '2AD1AC29772C60C33199E1A18FEE3B1EF5A918D56FF2F3A3E9E2F3F8E6AC6584',
      'hex'
    )
    newtx.sign(privateKey)
    console.log(newtx)
    return newtx
  }

  sendTx() {
    const serializedTx = this.createTx().serialize()
    console.log(serializedTx)
    console.log(serializedTx.toString('hex'))
    // this.api
    //   .sendTx(`0x${serializedTx.toString('hex')}`)
    //   .subscribe(res => console.log(res))
    console.log(web3)
    web3.eth.sendRawTransaction(
      `0x${serializedTx.toString('hex')}`,
      (res, error) => {
        console.log(res)
        console.info(error)
      }
    )
  }
}
