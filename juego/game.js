var game = new Phaser.Game(1900, 950, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

    //sprites
    game.load.image('jugador', 'fotos/SombreroRojo.png');
    game.load.image('jugador2', 'fotos/SombreroAzul.png');
    game.load.image('pelota', 'fotos/pelotaroja.png');
    game.load.image('pelota2', 'fotos/pelotaazul.png');
    game.load.image('pared','fotos/pared.png');
    game.load.image('diana','fotos/diana.png');
    game.load.image('dianaazul','fotos/dianaazul.png');
    game.load.image('exit','fotos/BotonExit.png');
    game.load.image('plantilla','fotos/Plantilla.png');
    game.load.image('abismo','fotos/abismo2.png');
    game.load.image('baseroja','fotos/baseroja.png');
    game.load.image('baseazul','fotos/baseazul.png');
    game.load.image('baserojamini','fotos/baserojamini.png');
    game.load.image('baseazulmini','fotos/baseazulmini.png');
    game.load.image('restart','fotos/BotonRestart.png');

    //music
    game.load.audio('cancion', ['musica/Partida.mp3', 'musica/Partida.ogg']);
    game.load.audio('disparo', ['musica/disparo.mp3', 'musica/disparo.ogg']);
    game.load.audio('rebote', ['musica/rebote.mp3', 'musica/rebote.ogg']);
    game.load.audio('ganar', ['musica/ganar.mp3', 'musica/ganar.ogg']);
    game.load.audio('menu', ['musica/menu.mp3', 'musica/menu.ogg']);
    game.load.audio('muerte', ['musica/muerte.mp3', 'musica/muerte.ogg']);
    game.load.audio('golpetazo', ['musica/golpe.mp3', 'musica/golpe.ogg']);
}

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
var z1xd=1700;
var z1xi=975;
var z1ya=75;
var z1yb=800;
var z2xd=875;
var z2xi=150;
var z2ya=75;
var z2yb=800;

//Marcador
var marcadorj1=3;
var marcadorj2=3;

var terminado=0;

function create() 
{
    game.physics.startSystem(Phaser.Physics.ARCADE);

    musica = game.add.audio('cancion');

    disparo = game.add.audio('disparo');

    rebote = game.add.audio('rebote');

    ganar = game.add.audio('ganar');

    menu = game.add.audio('menu');

    muerte = game.add.audio('muerte');

    golpetazo = game.add.audio('golpetazo');

    musica.play();

    fondo = game.add.sprite(0, 0, 'abismo'); 

    
    zona1mini = game.add.sprite(1125, 225, 'baserojamini');
    zona2mini = game.add.sprite(300, 225, 'baseazulmini');
    zona1 = game.add.sprite(1050, 150, 'baseroja');
    zona2 = game.add.sprite(225, 150, 'baseazul');
    
    plantilla = game.add.sprite(625, 420, 'plantilla');
    //Creamos el texto que sera el marcador
    text = game.add.text(game.world.centerX+15, game.world.centerY, marcadorj2+" - "+marcadorj1, 
    {
        font: "65px Times New Roman",
        fill: "#ffffff",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);

    //Creamos las dianas 
    //i=izquierda, d=derecha, a=arriba, c=centro, b=abajo
    dianaia = game.add.sprite(80, 100, 'dianaazul');
    dianaic = game.add.sprite(45, 425, 'dianaazul');
    dianaib = game.add.sprite(80, 750, 'dianaazul');
    dianada = game.add.sprite(1750, 100, 'diana');
    dianadc = game.add.sprite(1790, 425, 'diana');
    dianadb = game.add.sprite(1750, 750, 'diana');

    //Creamos las pelotas del jugador 1
    pelotas = game.add.group();
    pelotas.enableBody = true;
    pelotas.physicsBodyType = Phaser.Physics.ARCADE;

    pelotas.createMultiple(50, 'pelota');
    pelotas.setAll('checkWorldBounds', true);
    pelotas.setAll('outOfBoundsKill', true);

    //Creamos las pelotas del jugador 2
    pelotas2 = game.add.group();
    pelotas2.enableBody = true;
    pelotas2.physicsBodyType = Phaser.Physics.ARCADE;

    pelotas2.createMultiple(50, 'pelota2');
    pelotas2.setAll('checkWorldBounds', true);
    pelotas2.setAll('outOfBoundsKill', true);

	button = game.add.button(1800, 25, 'exit', actionOnClick, this, 2, 1, 0);

    //Creamos las paredes 
    pared = game.add.sprite(800,25,'pared');
    
    pared2 = game.add.sprite(850,900,'pared');

    //Creamos los jugadores
    sprite = game.add.sprite(1375, 475, 'jugador');
    sprite.anchor.set(0.5);

    sprite2 = game.add.sprite(525, 475, 'jugador2');
    sprite2.anchor.set(0.5);

    //Asignamos las fisicas a las paredes, a los jugadores y a las dianas
    game.physics.enable(pared, Phaser.Physics.ARCADE);
    game.physics.enable(pared2, Phaser.Physics.ARCADE);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    game.physics.enable(dianaia, Phaser.Physics.ARCADE);
    game.physics.enable(dianaic, Phaser.Physics.ARCADE);
    game.physics.enable(dianaib, Phaser.Physics.ARCADE);
    game.physics.enable(dianada, Phaser.Physics.ARCADE);
    game.physics.enable(dianadc, Phaser.Physics.ARCADE);
    game.physics.enable(dianadb, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
    sprite2.body.allowRotation = false;

    //Hacemos que los objetos no se puedan escapar de la ventana
    sprite.body.collideWorldBounds = true;
    sprite2.body.collideWorldBounds = true;

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
    teclas = game.input.keyboard.createCursorKeys();

    //Asignamos la velocidad de las paredes
    pared.body.velocity.x=100;
    pared2.body.velocity.x=-100;

    musica.loopFull(0.6);
}


function update() 
{
	plantilla.visible=false;

    //decimos hacia donde apuntan los jugadores
    sprite.rotation = game.physics.arcade.angleToPointer(sprite);
    sprite2.rotation = angle;

    //Comprobamos si el jugador 1 tiene el efecto de choque con la pelota
    if(golpe!=true)
    {
        pararjugador(sprite);
    }
    else
    {
        tiempo++;
        if(tiempo>=10*vida)
        {
            golpe=false;
            tiempo=0;
            vida=vida+2;
        }
    }

    //Comprobamos si el jugador 2 tiene el efecto de choque con la pelota
    if(golpe2!=true)
    {
         pararjugador(sprite2);
    }
    else
    {
        tiempo2++;
        if(tiempo2>=10*vida2)
        {
            golpe2=false;
            tiempo2=0;
            vida2=vida2+2;
        }
    }

    //Hacemos que las paredes se muevan de un lado a otro
    if(pared.body.position.x>=1400 || pared.body.position.x<=250) 
    {
    	pared.body.velocity.x=-pared.body.velocity.x;
    }

    if(pared2.body.position.x>=1400 || pared2.body.position.x<=250)
    {
        pared2.body.velocity.x=-pared2.body.velocity.x;
    }

    //Creamos las colisiones
    game.physics.arcade.collide(sprite2, pelotas, golpeajugador2);
    game.physics.arcade.collide(sprite, pelotas2, golpeajugador);
    game.physics.arcade.collide(pared, pelotas, sonidoRebota);
    game.physics.arcade.collide(pared, pelotas2, sonidoRebota);
    game.physics.arcade.collide(pared2, pelotas, sonidoRebota);
    game.physics.arcade.collide(pared2, pelotas2, sonidoRebota);
    game.physics.arcade.collide(dianada, pelotas2, golpeadiana2);
    game.physics.arcade.collide(dianadc, pelotas2, golpeadiana2);
    game.physics.arcade.collide(dianadb, pelotas2, golpeadiana2);
    game.physics.arcade.collide(dianaia, pelotas, golpeadiana);
    game.physics.arcade.collide(dianaic, pelotas, golpeadiana);
    game.physics.arcade.collide(dianaib, pelotas, golpeadiana);
    
    //jugador 1 teclas
    if(golpe!=true)
    {
        if (teclas.left.isDown)
        {
            sprite.body.velocity.x = -200;       
        }
    
        if (teclas.right.isDown)
        {
            sprite.body.velocity.x = 200; 
        }

        if (teclas.up.isDown)
        {
            sprite.body.velocity.y = -200;
        }

        if (teclas.down.isDown)
        {
            sprite.body.velocity.y = 200;
        }

        if (game.input.activePointer.isDown)
        {
            fire();
        }
    }

    //jugador 2 teclas
    if(golpe2!=true)
    { 
        if(game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            sprite2.body.velocity.x = -200;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            sprite2.body.velocity.y = -200;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            sprite2.body.velocity.y = 200;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            sprite2.body.velocity.x = 200;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.H))
        {
            angle-=0.1;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.J))
        {
            angle+=0.1;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR))
        {
            fire2(sprite2);
        }
    }

    //Comprobamos si las dianas de la izquierda estan dadas
    if(compruebadianas==3)
    {
        reducezona2(zona2);
        console.log("Se reduce la zona 2");
        compruebadianas=0;
    }

    //Comprobamos si las dianas de la derecha estan dadas
    if(compruebadianas2==3)
    {
        reducezona(zona1);
        console.log("Se reduce la zona 1");
        compruebadianas2=0;
    }

    pierdej1(sprite);
    pierdej2(sprite2);

    if(marcadorj1==0)
    {
        derrota();
    }

    else if(marcadorj2==0)
    {
        derrota2();
    }

    else
    {
        //Imprimimos el marcador
        text.setText(vida2*5+"%\n"+marcadorj2+" - "+marcadorj1+"\n"+vida*5+"%");
    }

}

//Disparo pelotas jugador 1
function fire()
{

    if (game.time.now > nextFire && pelotas.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var pelota = pelotas.getFirstDead();
        
        pelota.reset(sprite.x - 12.5, sprite.y - 12.5);
        
        game.physics.arcade.moveToPointer(pelota, 800);

        pelota.body.bounce.set(1);

        disparo.play();
    }

}

//Disparo pelotas jugador 2
function fire2(sprite2)
{

    if (game.time.now > nextFire2 && pelotas2.countDead() > 0)
    {
        nextFire2 = game.time.now + fireRate;

        var pelota2 = pelotas2.getFirstDead();

        pelota2.reset(sprite2.x - 12.5, sprite2.y - 12.5);

        pelota2.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(sprite2.angle, 800));

        pelota2.body.bounce.set(1);

        disparo.play();
    }

}

function golpeadiana2(pelota2)
{
    pelota2.kill();
    compruebadianas2++;
    rebote.play();
}

function golpeadiana(pelota)
{
    pelota.kill();
    compruebadianas++;
    rebote.play();
}

function golpeajugador2(sprite2,pelota)
{
    golpe2=true;
    pelota.kill();
    golpetazo.play();
}

function golpeajugador(sprite,pelota2)
{
    golpe=true;
    pelota2.kill();
    golpetazo.play();
}

function pararjugador(sprite)
{
    if(sprite.body.velocity.y != 0)
    {
        sprite.body.velocity.y=0;
    }

    if(sprite.body.velocity.x != 0)
    {
        sprite.body.velocity.x=0;
    }
}

function reducezona(zona1)
{
    z1xd=z1xd-100;
    z1xi=z1xi+75;
    z1ya=z1ya+75;
    z1yb=z1yb-75;
    zona1.x=2000;
    zona1.y=2000;
}

function reducezona2(zona2)
{
    z2xd=z2xd-100;
    z2xi=z2xi+75;
    z2ya=z2ya+75;
    z2yb=z2yb-75;
    zona2.x=2000;
    zona2.y=2000;
}

function pierdej1(sprite)
{
    if(sprite.body.position.x>z1xd || sprite.body.position.x<z1xi || sprite.body.position.y<z1ya || sprite.body.position.y>z1yb)
    {
        marcadorj1--;
        sprite.body.position.x=1300;
        sprite.body.position.y=450;
        vida=0;
        golpe=false;
        tiempo=0;
        muerte.play();
    }
}

function pierdej2(sprite2)
{
    if(sprite2.body.position.x>z2xd || sprite2.body.position.x<z2xi || sprite2.body.position.y<z2ya || sprite2.body.position.y>z2yb)
    {
        marcadorj2--;
        sprite2.body.position.x=525;
        sprite2.body.position.y=450;
        vida2=0;
        golpe2=false;
        tiempo2=0;
        muerte.play();
    }
}

function actionOnClick() 
{

    document.location.target = "_blank";
    document.location.href='../juego/index.html';

}

function actionRestart() 
{

    document.location.target = "_blank";
    document.location.href='../juego/cargaJuego.html';

}

function sonidoRebota()
{
    rebote.play();
}

function derrota()
{
    //Se termina el juego gana jugador 2
        musica.destroy();
        sprite.body.position.x=1375;
        sprite.body.position.y=450;
        sprite2.body.position.x=525;
        sprite2.body.position.y=450;
        plantilla.visible=true;
        text.fill='#000fff';
        text.setText("Ha ganado el jugador 1");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
        button = game.add.button(750, 600, 'restart', actionRestart, this, 2, 1, 0);
        if(terminado=0)
        {
            menu.play();
        }
        terminado=1;
}

function derrota2()
{
    //Se termina el juego gana jugador 1
        musica.destroy();
        sprite.body.position.x=1375;
        sprite.body.position.y=450;
        sprite2.body.position.x=525;
        sprite2.body.position.y=450;
        plantilla.visible=true;
        text.fill='#ff0000';
        text.setText("Ha ganado el jugador 2");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
        button = game.add.button(750, 600, 'restart', actionRestart, this, 2, 1, 0);
        if(terminado=0)
        {
            menu.play();
        }
        terminado=1;
}
