import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gamelevel',
  templateUrl: './gamelevel.page.html',
  styleUrls: ['./gamelevel.page.scss'],
})
export class GamelevelPage implements OnInit {
	public character: any;

  constructor(
  	private router: Router, 
  	public navCtrl : NavController, 
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.character = params['character'];
    });
  }

  goBack(){
		this.router.navigateByUrl('/character').then(nav => {
	    console.log(nav); 
	  }, err => {
	    console.log(err);
	  });
	}

	startEasy(level) {
	  this.router.navigate(['/gamemode', { level, character: this.character, timer: 7 }]);
	}

	startMedium(level){
		this.router.navigate(['/gamemode', { level, character: this.character, timer: 10 }]);
	}

	startHard(level){
		this.router.navigate(['/gamemode', { level, character: this.character, timer: 15 }]);
	}

}
