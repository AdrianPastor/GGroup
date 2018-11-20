var Gentleball = Gentleball || {};

var fondo;

Gentleball.Controles = function(){};

Gentleball.Controles.prototype = {
	create: function() 
  	{
  		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'FondoControles');


    	fondo = this.game.add.button(this.game.world.centerX-39, this.game.world.centerY+170,'BotonExit2', this.actionOnClick0, this,1,0);
  },

  actionOnClick0: function () 
  {
    this.game.state.start('MainMenu');
  }

};