import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
  public level: any;
  public v1: string = 'none';
  public v2: string = 'block';

  constructor(
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
   ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
    });
  }

  async presentWin() {
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

   async presentLose() {
    const alert = await this.alertController.create({
      header: 'Oops! You Lose!',
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
    if(this.tap%2==0) {
      this.v1 = "block";
      this.v2 = "none";
    }
    else {
      this.v1 = "none";
      this.v2 = "block";
    }
    switch(this.level){
      case "Easy": 
      this.margin = `${parseInt(this.margin.split('%')[0], 0) + 6}%`;
      this.size = this.size + 0.1;
      break;
      case "Medium": 
      this.margin = `${parseInt(this.margin.split('%')[0], 0) + 4}%`;
      this.size = this.size + 0.05;
      break;
      case "Hard": 
      this.margin = `${parseInt(this.margin.split('%')[0], 0) + 2}%`;
      this.size = this.size + 0.02;
      break;
      default: break;
    }
  	
  	// console.log(this.margin);
  	// console.log(parseInt(this.margin, 0) );
  	// console.log(this.size);

    if(this.margin == "132%"){
    	this.presentWin();
    }
  }

  restart(){
    this.tap = 0;
  	this.margin = '0%';
  	this.size = 1;
  }

  backToHome(){
  	this.router.navigateByUrl('/gamelevel').then(nav => {
    console.log(nav); 
  }, err => {
    console.log(err);
  });
  }

}
