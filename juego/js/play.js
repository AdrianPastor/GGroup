
var playState= {


create: function() {

	this.keyboard = game.input.keyboard;

	this.player = game.add.sprite(16,16,'player');
	game.physics.enable(this.player, Phaser.physics.ARCADE);

	this.win = game.add.sprite(16,16,'win');
	game.physics.enable(this.win, Phaser.physics.ARCADE);

},

update: function(){


	if (this.keyboard.isDown(Phaser.keyboard.A)){
		this.player.body.velocity.x=-175;
	} else if (this.keyboard.isDown(Phaser.keyboard.D)){
		this.player.body.velocity.x=175; 
	} else {
		this.player.body.velocity.x=0;
	}

	if (this.keyboard.isDown(Phaser.keyboard.W)){
		this.player.body.velocity.y=-175;
	} else if (this.keyboard.isDown(Phaser.keyboard.S)){
		this.player.body.velocity.y=175; 
	} else {
		this.player.body.velocity.y=0;
	}

},

Win: function() {
	game.state.start('win');
}


};


