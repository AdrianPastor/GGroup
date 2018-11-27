var Gentleball = Gentleball || {};

//loading the game assets
Gentleball.Preload = function(){};

Gentleball.Preload.prototype = {
  preload: function() {
  	//MainMenu
  	this.game.load.image('MenuSinBotones', 'fotos/MenuSinBotones.png');
  	this.game.load.image('BotonStart', 'fotos/BotonStart.png');
  	this.game.load.image('BotonControles', 'fotos/BotonControles.png');

	  //Menu controles
	  this.game.load.image('FondoControles', 'fotos/Controles.png');
	  this.game.load.image('BotonExit2', 'fotos/BotonExit2.png');
	
    //Lobby
    this.game.load.image('BotonPlay', 'fotos/BotonPlay.png');
    this.game.load.image('LobbyText', 'fotos/LobbyText.png');
    this.game.load.image('Fondo', 'fotos/Fondo.png');

  	//sprites
    this.game.load.image('jugador', 'fotos/SombreroRojo.png');
    this.game.load.image('jugador2', 'fotos/SombreroAzul.png');
    this.game.load.image('pelota', 'fotos/pelotaroja.png');
    this.game.load.image('pelota2', 'fotos/pelotaazul.png');
    this.game.load.image('pared','fotos/pared.png');
    this.game.load.image('diana','fotos/diana.png');
    this.game.load.image('dianaazul','fotos/dianaazul.png');
    this.game.load.image('exit','fotos/BotonExit.png');
    this.game.load.image('plantilla','fotos/Plantilla.png');
    this.game.load.image('abismo','fotos/abismo.png');
    this.game.load.image('baseroja','fotos/baseroja.png');
    this.game.load.image('baseazul','fotos/baseazul.png');
    this.game.load.image('baserojamini','fotos/baserojamini.png');
    this.game.load.image('baseazulmini','fotos/baseazulmini.png');
    this.game.load.image('restart','fotos/BotonRestart.png');

    //music
    this.game.load.audio('cancion', ['musica/Partida.mp3', 'musica/Partida.ogg']);
    this.game.load.audio('disparo', ['musica/disparo.mp3', 'musica/disparo.ogg']);
    this.game.load.audio('rebote', ['musica/rebote.mp3', 'musica/rebote.ogg']);
    this.game.load.audio('ganar', ['musica/ganar.mp3', 'musica/ganar.ogg']);
    this.game.load.audio('menu', ['musica/menu.mp3', 'musica/menu.ogg']);
    this.game.load.audio('muerte', ['musica/muerte.mp3', 'musica/muerte.ogg']);
    this.game.load.audio('golpetazo', ['musica/golpe.mp3', 'musica/golpe.ogg']);

  	},


  create: function() {

  	this.state.start('Lobby'); //'Lobby'

  }
};