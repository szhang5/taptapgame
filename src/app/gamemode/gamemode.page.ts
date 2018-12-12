import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-gamemode',
  templateUrl: './gamemode.page.html',
  styleUrls: ['./gamemode.page.scss'],
})
export class GamemodePage implements OnInit {
	public tap: number = 0;

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  	
  }

  async presentAlert() {
	    const alert = await this.alertController.create({
	      header: 'You Win!',
	      buttons: [{
          text: 'Restart',
          cssClass: 'secondary',
          handler: () => {
            this.tap = 0;
          }
        }, {
          text: 'Okay',
          handler: () => {
          	this.tap = 0;
            this.backToHome();
          }
        }]
	    });

	    await alert.present();
	}

  tapEvent(e) {
  	this.tap++;
  	if(this.tap > 30){
    	this.tap--;
    }
    if(this.tap == 30){
    	this.presentAlert();
    }
    
    // console.log(this.tap);
  }

  backToHome(){
  	this.router.navigateByUrl('/home').then(nav => {
    console.log(nav); 
  }, err => {
    console.log(err);
  });
  }

}
