var Gentleball = Gentleball || {};

var i;
//Creamos los objetos del juego
//Sonidos
var musica;
var disparo;
var rebote;
var ganar;
var menu;
var muerte;
var golpetazo;
//Jugadores
var sprite;
var sprite2;
//Pelotas
var pelotas;
var pelotas2;
//Barreras 
var pared;
var pared2;
//Dianas
var dianaia;
var dianaic;
var dianaib;
var dianada;
var dianadc;
var dianadb;
//Zonas en las que se moveran los jugadores
var zona1;
var zona2;
var zona1mini;
var zona2mini;

//Fondo
var fondo;

//Texto
var text;
var text2;
var text3;
var text4;

var plantilla;

//Boton para salir
var exit;

//Variables auxiliares
var angle=0;
var fireRate = 1000;
var nextFire = 0;
var nextFire2 = 0;
var vida=0;
var vida2=0;
var golpe=false;
var golpe2=false;
var tiempo=0;
var tiempo2=0;
var compruebadianas=0;
var compruebadianas2=0;
var z1xd=894.73;
var z1xi=513.15;
var z1ya=40;
var z1yb=421.05;
var z2xd=460.52;
var z2xi=78.95;
var z2ya=40;
var z2yb=421.05;

//Marcador
var marcadorj1=3;
var marcadorj2=3;

var terminado=0;

Gentleball.Game = function(){};

Gentleball.Game.prototype = {

create: function()  
{
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    musica = this.game.add.audio('cancion');

    disparo = this.game.add.audio('disparo');

    rebote = this.game.add.audio('rebote');

    ganar = this.game.add.audio('ganar');

    menu = this.game.add.audio('menu');

    muerte = this.game.add.audio('muerte');

    golpetazo = this.game.add.audio('golpetazo');
    
    musica.play();

    fondo = this.game.add.sprite(0, 0, 'abismo'); 

    
    zona1mini = this.game.add.sprite(592, 118.4, 'baserojamini');
    zona2mini = this.game.add.sprite(157.9, 118.4, 'baseazulmini');
    zona1 = this.game.add.sprite(552.63, 78.95, 'baseroja');
    zona2 = this.game.add.sprite(118.4, 78.95, 'baseazul');
    
    plantilla = this.game.add.sprite(328.95, 221, 'plantilla');
    //Creamos el texto que sera el marcador
    
    
    text4 = this.game.add.text(this.game.world.centerX-155, this.game.world.centerY-15, " ", 
    {
        font: "28px Montserrat",
        fill: "#000000",
        align: "center"
    });
    
   
   text = this.game.add.text(this.game.world.centerX+8, this.game.world.centerY+160, marcadorj2+" - "+marcadorj1, 
    {
        font: "34.21px Montserrat",
        fill: "#ffffff",
        align: "center"
    });
    text2 = this.game.add.text(this.game.world.centerX+30, this.game.world.centerY+180, vida*5+'%', 
    {
        font: "34.21px Montserrat",
        fill: "#DC143C",
        align: "center"
    });
    text3 = this.game.add.text(this.game.world.centerX-70, this.game.world.centerY+180, vida2*5+'%', 
    {
        font: "34.21px Montserrat",
        fill: "#1E90FF",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);

    //Creamos las dianas 
    //i=izquierda, d=derecha, a=arriba, c=centro, b=abajo
    dianaia = this.game.add.sprite(42.1, 52.63, 'dianaazul');
    dianaic = this.game.add.sprite(23.9, 223.69, 'dianaazul');
    dianaib = this.game.add.sprite(42.1, 394.74, 'dianaazul');
    dianada = this.game.add.sprite(921.05, 52.63, 'diana');
    dianadc = this.game.add.sprite(942.1, 223.69, 'diana');
    dianadb = this.game.add.sprite(921.05, 394.74, 'diana');

    //Creamos las pelotas del jugador 1
    pelotas = this.game.add.group();
    pelotas.enableBody = true;
    pelotas.physicsBodyType = Phaser.Physics.ARCADE;

    pelotas.createMultiple(50, 'pelota');
    pelotas.setAll('checkWorldBounds', true);
    pelotas.setAll('outOfBoundsKill', true);

    //Creamos las pelotas del jugador 2
    pelotas2 = this.game.add.group();
    pelotas2.enableBody = true;
    pelotas2.physicsBodyType = Phaser.Physics.ARCADE;

    pelotas2.createMultiple(50, 'pelota2');
    pelotas2.setAll('checkWorldBounds', true);
    pelotas2.setAll('outOfBoundsKill', true);

	button = this.game.add.button(947.36, 13.16, 'exit', this.actionOnClick, this, 2, 1, 0);

    //Creamos las paredes 
    pared = this.game.add.sprite(421,13.16,'pared');
    
    pared2 = this.game.add.sprite(447.36,473.68,'pared');

    //Creamos los jugadores
    sprite = this.game.add.sprite(723.68, 250, 'jugador');
    sprite.anchor.set(0.5);

    sprite2 = this.game.add.sprite(276.31, 250, 'jugador2');
    sprite2.anchor.set(0.5);

    //Asignamos las fisicas a las paredes, a los jugadores y a las dianas
    this.game.physics.enable(pared, Phaser.Physics.ARCADE);
    this.game.physics.enable(pared2, Phaser.Physics.ARCADE);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    this.game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianaia, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianaic, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianaib, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianada, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianadc, Phaser.Physics.ARCADE);
    this.game.physics.enable(dianadb, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
    sprite2.body.allowRotation = false;

    //Hacemos que las paredes y las dianas no se puedan mover
    pared.body.immovable = true;
    pared2.body.immovable = true;
    dianaia.body.immovable = true;
    dianaic.body.immovable = true;
    dianaib.body.immovable = true;
    dianada.body.immovable = true;
    dianadc.body.immovable = true;
    dianadb.body.immovable = true;

    //Las teclas up, down, right y left son mas faciles de usar
    teclas = this.game.input.keyboard.createCursorKeys();

    //Asignamos la velocidad de las paredes
    pared.body.velocity.x=100;
    pared2.body.velocity.x=-100;

    musica.loopFull(0.6);
},

update: function()  
{
	plantilla.visible=false;

    //decimos hacia donde apuntan los jugadores
    sprite.rotation = this.game.physics.arcade.angleToPointer(sprite);
    sprite2.rotation = angle;


  
    //Comprobamos si el jugador 1 tiene el efecto de choque con la pelota
    if(golpe!=true)
    {
        this.pararjugador(sprite);
    }
    else
    {
        tiempo++;
        if(tiempo>=10*vida)
        {
            golpe=false;
            tiempo=0;
            vida+=2;
        }
    }

    //Comprobamos si el jugador 2 tiene el efecto de choque con la pelota
    if(golpe2!=true)
    {
        this.pararjugador(sprite2);
    }
    else
    {
        tiempo2++;
        if(tiempo2>=10*vida2)
        {
            golpe2=false;
            tiempo2=0;
            vida2+=2;
        }
    }

    //Hacemos que las paredes se muevan de un lado a otro
    if(pared.body.position.x>=736.84 || pared.body.position.x<=131.58) 
    {
    	pared.body.velocity.x=-pared.body.velocity.x;
        pared2.body.velocity.x=-pared2.body.velocity.x;
    }

    //Creamos las colisiones
    if(pelotas2.getClosestTo(sprite)!=null)
    {       
        var pelota2 = pelotas2.getClosestTo(sprite);
        var posx = sprite.body.position.x+19.736;
        var posy = sprite.body.position.y+19.736;
        var pospx = pelota2.body.position.x;
        var pospy = pelota2.body.position.y;
        if(pospx+6.579<posx+26.31 && pospx+6.579>posx-26.31 && pospy+6.579<posy+26.31 && pospy+6.579>posy-26.31)
        {
            sprite.body.velocity.x = pelota2.body.velocity.x*0.5;
            sprite.body.velocity.y = pelota2.body.velocity.y*0.5;
            golpe=true;
            pelota2.kill();
            golpetazo.play();
        }
    }

    if(pelotas.getClosestTo(sprite2)!=null)
    {
        var pelota = pelotas.getClosestTo(sprite2);
        var posx = sprite2.body.position.x+19.736;
        var posy = sprite2.body.position.y+19.736;
        var pospx = pelota.body.position.x;
        var pospy = pelota.body.position.y;
        if(pospx+6.579<posx+26.31 && pospx+6.579>posx-26.31 && pospy+6.579<posy+26.31 && pospy+6.579>posy-26.31)
        {
            sprite2.body.velocity.x=pelota.body.velocity.x*0.5;
            sprite2.body.velocity.y=pelota.body.velocity.y*0.5;
            golpe2=true;
            pelota.kill();
            golpetazo.play();
        }
    }

    this.game.physics.arcade.collide(pared, pelotas, this.sonidoRebota);
    this.game.physics.arcade.collide(pared, pelotas2, this.sonidoRebota);
    this.game.physics.arcade.collide(pared2, pelotas, this.sonidoRebota);
    this.game.physics.arcade.collide(pared2, pelotas2, this.sonidoRebota);
    this.game.physics.arcade.collide(dianada, pelotas2, this.golpeadiana2);
    this.game.physics.arcade.collide(dianadc, pelotas2, this.golpeadiana2);
    this.game.physics.arcade.collide(dianadb, pelotas2, this.golpeadiana2);
    this.game.physics.arcade.collide(dianaia, pelotas, this.golpeadiana);
    this.game.physics.arcade.collide(dianaic, pelotas, this.golpeadiana);
    this.game.physics.arcade.collide(dianaib, pelotas, this.golpeadiana);
    
    //jugador 1 teclas
    if(golpe!=true)
    {
        if (teclas.left.isDown)
        {
            sprite.body.velocity.x = -105.26;       
        }
    
        if (teclas.right.isDown)
        {
            sprite.body.velocity.x = 105.26; 
        }

        if (teclas.up.isDown)
        {
            sprite.body.velocity.y = -105.26;
        }

        if (teclas.down.isDown)
        {
            sprite.body.velocity.y = 105.26;
        }

        if (this.game.input.activePointer.isDown)
        {
            this.fire();
        }
    }

    //jugador 2 teclas
    if(golpe2!=true)
    { 
        if(this.game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            sprite2.body.velocity.x = -105.26;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            sprite2.body.velocity.y = -105.26;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            sprite2.body.velocity.y = 105.26;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            sprite2.body.velocity.x = 105.26;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.H))
        {
            angle-=0.1;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.J))
        {
            angle+=0.1;
        }

        if(this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR))
        {
            this.fire2();
        }
    }

    //Comprobamos si las dianas de la izquierda estan dadas
    if(compruebadianas==3)
    {
        this.reducezona2(zona2);
        compruebadianas=0;
    }

    //Comprobamos si las dianas de la derecha estan dadas
    if(compruebadianas2==3)
    {
        this.reducezona(zona1);
        compruebadianas2=0;
    }

    this.pierdej1();
    this.pierdej2();
    
 
    if(marcadorj1<1)
    {
        
        this.derrota();
        if(marcadorj1 == 0){
            ganar.play();
            marcadorj1--
        }
     
    }

    else if(marcadorj2<1)
    {
        
        this.derrota2();
        if(marcadorj2 == 0){
            ganar.play();
            marcadorj2--
        }
        
        
    }

    else
    {
        //Imprimimos el marcador
        //text.setText(vida2*5+"%\n"+marcadorj2+" - "+marcadorj1+"\n"+vida*5+"%");
        
        text.setText(marcadorj2+" - "+marcadorj1);
        text2.setText(vida*5+"%");
        text3.setText(vida2*5+"%");
       
    }
    for(i;i<1;i++){
        ganar.play();
    }

},


//Disparo pelotas jugador 1
fire: function() 
{

    if (this.game.time.now > nextFire && pelotas.countDead() > 0)
    {
        nextFire = this.game.time.now + fireRate;

        var pelota = pelotas.getFirstDead();
        
        pelota.reset(sprite.x - 6.579, sprite.y - 6.579);
        
        this.game.physics.arcade.moveToPointer(pelota, 421.05);

        pelota.body.bounce.set(1);

        disparo.play();
    }

},

//Disparo pelotas jugador 2
fire2: function() 
{

    if (this.game.time.now > nextFire2 && pelotas2.countDead() > 0)
    {
        nextFire2 = this.game.time.now + fireRate;

        var pelota2 = pelotas2.getFirstDead();

        pelota2.reset(sprite2.x - 6.579, sprite2.y - 6.579);

        pelota2.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(sprite2.angle, 421.05));

        pelota2.body.bounce.set(1);

        disparo.play();
    }

},

golpeadiana2: function(pelota2)
{
    pelota2.kill();
    compruebadianas2++;
    rebote.play();
},

golpeadiana: function(pelota)
{
    pelota.kill();
    compruebadianas++;
    rebote.play();
},

pararjugador: function(sprite)
{
    if(sprite.body.velocity.y != 0)
    {
        sprite.body.velocity.y=0;
    }

    if(sprite.body.velocity.x != 0)
    {
        sprite.body.velocity.x=0;
    }
},

reducezona: function(zona1)
{
    z1xd=z1xd-52.63;
    z1xi=z1xi+39.47;
    z1ya=z1ya+39.47;
    z1yb=z1yb-39.47;
    zona1.x=2000;
    zona1.y=2000;
},

reducezona2: function(zona2)
{
    z2xd=z2xd-52.63;
    z2xi=z2xi+39.47;
    z2ya=z2ya+39.47;
    z2yb=z2yb-39.47;
    zona2.x=2000;
    zona2.y=2000;
},

pierdej1: function() 
{
    if(sprite.body.position.x>z1xd || sprite.body.position.x<z1xi || sprite.body.position.y<z1ya || sprite.body.position.y>z1yb)
    {
        marcadorj1--;
        sprite.body.position.x=684.21;
        sprite.body.position.y=236.84;
        vida=0;
        golpe=false;
        tiempo=0;
        muerte.play();
    }
},

pierdej2: function() 
{
    if(sprite2.body.position.x>z2xd || sprite2.body.position.x<z2xi || sprite2.body.position.y<z2ya || sprite2.body.position.y>z2yb)
    {
        marcadorj2--;
        sprite2.body.position.x=276.32;
        sprite2.body.position.y=236.84;
        vida2=0;
        golpe2=false;
        tiempo2=0;
        muerte.play();
    }
},

actionOnClick: function()  
{
    angle=0;
    fireRate = 1000;
    nextFire = 0;
    nextFire2 = 0;
    vida=0;
    vida2=0;
    golpe=false;
    golpe2=false;
    tiempo=0;
    tiempo2=0;
    compruebadianas=0;
    compruebadianas2=0;
    z1xd=894.73;
    z1xi=513.15;
    z1ya=40;
    z1yb=421.05;
    z2xd=460.52;
    z2xi=78.95;
    z2ya=40;
    z2yb=421.05;
    marcadorj1=3;
    marcadorj2=3;
    terminado=0;
    musica.destroy();

    this.game.state.start('MainMenu');
},

actionRestart: function()  
{
    angle=0;
    fireRate = 1000;
    nextFire = 0;
    nextFire2 = 0;
    vida=0;
    vida2=0;
    golpe=false;
    golpe2=false;
    tiempo=0;
    tiempo2=0;
    compruebadianas=0;
    compruebadianas2=0;
    z1xd=894.73;
    z1xi=513.15;
    z1ya=40;
    z1yb=421.05;
    z2xd=460.52;
    z2xi=78.95;
    z2ya=40;
    z2yb=421.05;
    marcadorj1=3;
    marcadorj2=3;
    terminado=0;


    this.game.state.start('Game');
},

sonidoRebota: function() 
{
    rebote.play();
},

derrota: function() 
{
    //Se termina el juego gana jugador 2
        musica.destroy();
        
        sprite.body.position.x=723.68;
        sprite.body.position.y=236.84;
        sprite2.body.position.x=276.32;
        sprite2.body.position.y=236.84;
        plantilla.visible=true;
        text4.fill='#000fff';
        text4.setText("Ha ganado el jugador 1");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
   
        button = this.game.add.button(394.74, 350, 'restart', this.actionRestart, this, 2, 1, 0);
 
},

derrota2: function()
{
    //Se termina el juego gana jugador 1
        musica.destroy();
        
        sprite.body.position.x=723.68;
        sprite.body.position.y=236.84;
        sprite2.body.position.x=276.32;
        sprite2.body.position.y=236.84;
        plantilla.visible=true;
        text4.fill='#ff0000';
        text4.setText("Ha ganado el jugador 2");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
  
        button = this.game.add.button(394.74, 350, 'restart', this.actionRestart, this, 2, 1, 0);

}


};