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
	public margin: string = '0%';
	public size: number = 1;

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
          this.restart();
        }
      }, {
        text: 'Okay',
        handler: () => {
        	this.restart();
          this.backToHome();
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
	}

  tapEvent(e) {
  	this.tap++;
  	this.margin = `${parseInt(this.margin.split('%')[0], 0) + 3}%`;
  	this.size = this.size + 0.1;
  	// console.log(this.margin);
  	// console.log(parseInt(this.margin, 0) );
  	// console.log(this.size);

  	// if(this.tap > 48){
   //  	this.restart();
   //  }
    if(this.tap == 48){
    	this.presentAlert();
    }
    
    // console.log(this.tap);
  }

  restart(){
  	this.tap = 0;
  	this.margin = '0%';
  	this.size = 1;
  }

  backToHome(){
  	this.router.navigateByUrl('/home').then(nav => {
    console.log(nav); 
  }, err => {
    console.log(err);
  });
  }

}
