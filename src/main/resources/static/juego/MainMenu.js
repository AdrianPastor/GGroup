var Gentleball = Gentleball || {};

var start;
var controls;
var menu;
var exit;
var user;

Gentleball.MainMenu = function(){};

Gentleball.MainMenu.prototype = {
	create: function() 
  	{
		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'MenuSinBotones');

    	start = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY,'BotonStart', this.actionOnClick0, this,1,0);

    	controls = this.game.add.button(this.game.world.centerX-114, this.game.world.centerY+120,'BotonControles', this.actionOnClick1, this,1,0);
        
    	//exit = this.game.add.button(947.36, 13.16, 'exit', this.actionOnClick2, this, 1, 0);
    	
    	menu = this.game.add.audio('menu');
       
    	menu.play();
    	
    	menu.loopFull(0.6);

  },


  actionOnClick0: function () 
  {
	 
      this.game.state.start('Tipo');
  },

  actionOnClick1: function () 
  { 
	
    this.game.state.start('Controles'); 
  },
 /* 
  actionOnClick2: function () 
  { 
	  menu.destroy();
	  this.game.state.start('Lobby');
  },
*/
};