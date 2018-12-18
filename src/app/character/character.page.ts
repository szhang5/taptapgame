import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

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

	chooseCharacter(character) {
		this.router.navigate(['/gamelevel', { character }]);
	}

}
