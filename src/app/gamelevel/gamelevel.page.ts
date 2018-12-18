import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GamemodePage } from '../gamemode/gamemode.page';

@Component({
  selector: 'app-gamelevel',
  templateUrl: './gamelevel.page.html',
  styleUrls: ['./gamelevel.page.scss'],
})
export class GamelevelPage implements OnInit {

  constructor(private router: Router, public navCtrl : NavController) { }

  ngOnInit() {
  }

  backToHome(){
		this.router.navigateByUrl('/home').then(nav => {
	    console.log(nav); 
	  }, err => {
	    console.log(err);
	  });
	}

	startEasy(level) {
	  this.router.navigate(['/gamemode', { level }]);
	}

	startMedium(level){
		this.router.navigate(['/gamemode', { level }]);
	}

	startHard(level){
		this.router.navigate(['/gamemode', { level }]);
	}

}
