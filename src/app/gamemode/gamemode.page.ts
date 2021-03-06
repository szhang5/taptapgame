import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import 'hammerjs';

@Component({
  selector: 'app-gamemode',
  templateUrl: './gamemode.page.html',
  styleUrls: ['./gamemode.page.scss'],
})
export class GamemodePage implements OnInit {
  public HEIGHT: number = 136;
	public tap: number = 0;
	public margin: string = '-4%';
	public size: number = 1;
  public level: any;
  public character: any;
  public path: string = "https://res.cloudinary.com/zoey1111/image/upload/c_scale,w_275/";
  public imgPath1: any;
  public imgPath2: any;
  public v1: string = 'none';
  public v2: string = 'block';
  public timer: number;
  public t: number;
  public tmpTimerVal: number;
  public timerController:any;
  public isPause: boolean = false;
  public target: number = this.HEIGHT+4;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private tts: TextToSpeech,
   ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.character = params['character'];
      this.timer = params['timer'];
    });
    if(this.character){
      this.setCharacter(this.character);
    } 
    this.t = this.timer;
    this.readyAlert()
  }

  setCharacter(character){
    switch (character) {
      case '1':
        this.imgPath1 = this.path + "v1545129370/luffy4.png";
        this.imgPath2 = this.path + "v1545129369/luffy3.png";
        console.log(this.imgPath1);
        break;
      case '2':
        this.imgPath1 = this.path + "v1545127932/baoqingtian1.png";
        this.imgPath2 = this.path + "v1545127932/baoqingtian2.png";
        break;
      case '3':
        this.imgPath1 = this.path + "v1545127932/someone1.png";
        this.imgPath2 = this.path + "v1545127933/someone2.png";
        break;
      case '4':
        this.imgPath1 = this.path + "v1545128673/longmao1.png";
        this.imgPath2 = this.path + "v1545128673/longmao2.png";
        break;
      default:
        break;
    }
  }

//Alert
  async readyAlert() {
    const alert = await this.alertController.create({
      header: 'Ready?',
      message: 'Once you click the Go button, Timer will start and you need to tap as fast as you can to get to the botton of the screen. Are you Ready?',
      buttons: [{
        text: 'Go, TAP!!!',
        cssClass: 'secondary',
        handler: () => {
          this.StartTimer();
        }
      }, {
        text: 'Not Ready',
        handler: () => {
          this.backToCharacter();
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
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
          this.backToCharacter();
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
        text: 'Try Again',
        cssClass: 'secondary',
        handler: () => {
          this.restart();
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.restart();
          this.backToCharacter();
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  tapEvent(e) {
    if(!this.isPause){
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
          this.margin = `${parseInt(this.margin.split('%')[0], 0) + 4}%`;
          this.target -= 4;
          this.size = this.size + 0.1;
          break;
        case "Medium": 
          this.margin = `${parseInt(this.margin.split('%')[0], 0) + 2}%`;
          this.size = this.size + 0.05;
          this.target -= 2;
          break;
        case "Hard": 
          this.margin = `${parseInt(this.margin.split('%')[0], 0) + 1}%`;
          this.size = this.size + 0.02;
          this.target -= 1;
          break;
        default: 
          break;
      }
    }
    // console.log(this.size);
    // console.log(this.margin);
    // console.log(parseInt(this.margin, 0) );
    // console.log(this.t);
    
    if(parseInt(this.margin.split('%')[0], 0) >= this.HEIGHT && this.t >= 0){
      this.timerController.unsubscribe();
      this.presentWin().then(success=>{
        this.youWin();
      });
    } else if(this.t <= 0 && parseInt(this.margin.split('%')[0], 0) < this.HEIGHT){
      this.timerController.unsubscribe();
      this.presentLose().then(success=>{
        this.youLose();
      });
    }
  }

//Timer Setting
  StartTimer(){
    this.timerController = interval(1000)
      .pipe(take(this.timer))
      .subscribe(x =>{
        this.t = this.timer - x -1;
      });
  }

  PauseTimer() {
    // console.log("pause");
    this.isPause = true;
    this.tmpTimerVal = this.t;
    this.timerController.unsubscribe();
  }

  ResumeTimer(){
    // console.log("resume");
    if(this.isPause) {
      this.isPause = false;
      this.timerController = interval(1000)
      .pipe(take(this.tmpTimerVal))
      .subscribe(x =>{
        this.t = this.tmpTimerVal - x -1;
      });
    }
  }

//Voice setting
  youLose(){
    this.tts.speak({
      text:'Oops!! You lose! Hahahahaha',
      rate: 1.6
    });   
  }


  youWin(){
    this.tts.speak({
      text:'Cool!!!! You did it! Yeah!',
      rate: 1.6
    });   
  }


  restart(){
    this.timerController.unsubscribe();
    this.t = this.timer;
    this.StartTimer();
    this.tap = 0;
  	this.margin = '-4%';
  	this.size = 1;
    this.target = this.HEIGHT+4;
  }

  backToCharacter(){
    this.router.navigateByUrl('/character').then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err);
    });
  }

  backToHome(){
    this.router.navigateByUrl('/home').then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err);
    });
  }
}

 
