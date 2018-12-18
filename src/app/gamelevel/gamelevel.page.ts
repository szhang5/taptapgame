import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamelevel',
  templateUrl: './gamelevel.page.html',
  styleUrls: ['./gamelevel.page.scss'],
})
export class GamelevelPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome(){
		this.router.navigateByUrl('/home').then(nav => {
	    console.log(nav); 
	  }, err => {
	    console.log(err);
	  });
	}

}
