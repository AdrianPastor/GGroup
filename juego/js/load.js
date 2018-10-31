var loadState= {


	preload: function(){

		var loadingLabel = game.add.text(80,150, 'loading...',{font: '30px Courier', fill: '#ffffff'});

		game.load.image('jugador', 'fotos/hero.png');
    	game.load.image('jugador2', 'fotos/enemy.png');
    	game.load.image('pelota', 'fotos/pelota.png');
    	game.load.image('pared','fotos/pared.png');
    	game.load.image('diana','fotos/diana.png');

	},

	create: function() {

		game.state.start('menu');
	}



};