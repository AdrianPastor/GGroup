var Gentleball = Gentleball || {};

var start;
var controls;

Gentleball.MainMenu = function(){};

Gentleball.MainMenu.prototype = {
	create: function() 
  	{
  		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'MenuSinBotones');




    	start = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY,'BotonStart', this.actionOnClick0, this,1,0);

    	controls = this.game.add.button(this.game.world.centerX-114, this.game.world.centerY+120,'BotonControles', this.actionOnClick1, this,1,0);
  },

  actionOnClick0: function () 
  {
    this.game.state.start('Game');
  },

  actionOnClick1: function () 
  {
    this.game.state.start('Controles');
  }

};