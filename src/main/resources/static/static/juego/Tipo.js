var Gentleball = Gentleball || {};

var online;
var offline;
var menu;
var exit;
var user;

Gentleball.Tipo = function(){};

Gentleball.Tipo.prototype = {
	create: function() 
  	{
		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'MenuSinBotones');

    	online = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY,'Online', this.actionOnClick0, this,1,0);

    	offline = this.game.add.button(this.game.world.centerX-114, this.game.world.centerY+120,'Offline', this.actionOnClick1, this,1,0);
        
    	exit = this.game.add.button(947.36, 13.16, 'exit', this.actionOnClick2, this, 1, 0);
    	
    	
    	
  },


  actionOnClick0: function () 
  {
	 
      this.game.state.start('Lobby');
  },

  actionOnClick1: function () 
  { 
	menu.destroy();
    this.game.state.start('Game'); 
  },
  
  actionOnClick2: function () 
  { 
	  menu.destroy();
	  this.game.state.start('MainMenu');
  },

};
