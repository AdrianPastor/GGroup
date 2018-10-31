var menuState= {


	create: function() {

	var nameLabel = game.add.text (80,80, 'GentleBall',{font: '50px Arial', fill: 'ffffff'});

	var startLabel = game.add.text (80,game.world.height-80, 'Presiona Y para empezar',{font: '20px Arial', fill: 'ffffff'});

	var ykey = game.input.keyboard.addKey(Phaser.Keyboard.Y);

	ykey.onDown.addOnce(this.start, this);


	},

	start: function (){

		game.state.start('play');
	}


};