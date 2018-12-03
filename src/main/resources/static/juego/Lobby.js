var Gentleball = Gentleball || {};

var fondo;
var play;
var LobbyText;



Gentleball.Lobby = function(){};

Gentleball.Lobby.prototype = {
	create: function() 
  	{
  		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'Fondo');
        

        LobbyText = this.game.add.tileSprite(this.game.world.centerX-125, this.game.world.centerY-250, 250, 150, 'LobbyText');
    	
        play = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY+100,'BotonPlay', this.actionOnClick1, this,1,0);
        
        exit = this.game.add.button(947.36, 13.16, 'exit', this.actionOnClick0, this, 1, 0);
  },

  actionOnClick1: function () 
  {
	menu.destroy();
    this.game.state.start('Game'); 
  },
  
  actionOnClick0: function () 
  { 
    menu.destroy();
    this.game.state.start('MainMenu');
    
  }

};

