var Gentleball = Gentleball ||{};

Gentleball.game = new Phaser.Game(1000,500, Phaser.AUTO, '');

Gentleball.game.state.add('Preload',Gentleball.Preload);
Gentleball.game.state.add('Lobby', Gentleball.Lobby);
Gentleball.game.state.add('Tipo', Gentleball.Tipo);
Gentleball.game.state.add('MainMenu',Gentleball.MainMenu);
Gentleball.game.state.add('Game', Gentleball.Game);
Gentleball.game.state.add('Controles', Gentleball.Controles);

Gentleball.game.state.start('Preload');
