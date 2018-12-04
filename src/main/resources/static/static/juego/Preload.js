var Gentleball = Gentleball || {};

//loading the game assets
Gentleball.Preload = function(){};

Gentleball.Preload.prototype = {
  preload: function() {
    //MainMenu
    this.game.load.image('MenuSinBotones', 'juego/fotos/MenuSinBotones.png');
    this.game.load.image('BotonStart', 'juego/fotos/BotonStart.png');
    this.game.load.image('BotonControles', 'juego/fotos/BotonControles.png');

    //Menu controles
    this.game.load.image('FondoControles', 'juego/fotos/Controles.png');
    this.game.load.image('BotonExit2', 'juego/fotos/BotonExit2.png');
  
    //Lobby
    this.game.load.image('BotonPlay', 'juego/fotos/BotonPlay.png');
    this.game.load.image('LobbyText', 'juego/fotos/LobbyText.png');
    this.game.load.image('Fondo', 'juego/fotos/Fondo.png');
    
    // Online/Offline
    this.game.load.image('Online', 'juego/fotos/Online.png');
    this.game.load.image('Offline', 'juego/fotos/Offline.png');

    //sprites
    this.game.load.image('jugador', 'juego/fotos/SombreroRojo.png');
    this.game.load.image('jugador2', 'juego/fotos/SombreroAzul.png');
    this.game.load.image('pelota', 'juego/fotos/pelotaroja.png');
    this.game.load.image('pelota2', 'juego/fotos/pelotaazul.png');
    this.game.load.image('pared','juego/fotos/pared.png');
    this.game.load.image('diana','juego/fotos/diana.png');
    this.game.load.image('dianaazul','juego/fotos/dianaazul.png');
    this.game.load.image('exit','juego/fotos/BotonExit.png');
    this.game.load.image('plantilla','juego/fotos/Plantilla.png');
    this.game.load.image('abismo','juego/fotos/abismo.png');
    this.game.load.image('baseroja','juego/fotos/baseroja.png');
    this.game.load.image('baseazul','juego/fotos/baseazul.png');
    this.game.load.image('baserojamini','juego/fotos/baserojamini.png');
    this.game.load.image('baseazulmini','juego/fotos/baseazulmini.png');
    this.game.load.image('restart','juego/fotos/BotonRestart.png');

    //music
    this.game.load.audio('cancion', ['juego/musica/Partida.mp3', 'juego/musica/Partida.ogg']);
    this.game.load.audio('disparo', ['juego/musica/disparo.mp3', 'juego/musica/disparo.ogg']);
    this.game.load.audio('rebote', ['juego/musica/rebote.mp3', 'juego/musica/rebote.ogg']);
    this.game.load.audio('ganar', ['juego/musica/ganar.mp3', 'juego/musica/ganar.ogg']);
    this.game.load.audio('menu', ['juego/musica/menu.mp3', 'juego/musica/menu.ogg']);
    this.game.load.audio('muerte', ['juego/musica/muerte.mp3', 'juego/musica/muerte.ogg']);
    this.game.load.audio('golpetazo', ['juego/musica/golpe.mp3', 'juego/musica/golpe.ogg']);

    },


  create: function() {

    this.state.start('MainMenu'); //'MainMenu'

  }
};