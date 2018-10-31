var bootState = {

	create: function () {


		console.log("Funciono");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.state.start("load");

	}

};