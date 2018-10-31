var game = new Phaser.Game(1900, 950, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('jugador', 'fotos/hero.png');
    game.load.image('jugador2', 'fotos/enemy.png');
    game.load.image('pelota', 'fotos/pelota.png');
    game.load.image('pared','fotos/pared.png');
    game.load.image('diana','fotos/diana.png');
}

//Creamos los objetos del juego
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
var zonaj1;
var zonaj2;
var zonaj1mini;
var zonaj2mini;
var zona1;
var zona2;
var zona1mini;
var zona2mini;

//Texto
var text;

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
var z1xd=1675;
var z1xi=1000;
var z1ya=100;
var z1yb=800;
var z2xd=850;
var z2xi=175;
var z2ya=100;
var z2yb=800;

//Marcador
var marcadorj1=3;
var marcadorj2=3;


function create() 
{
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#757575'; 

    //Creamos las zonas
    zonaj1 = game.add.bitmapData(625,650);
    zonaj2 = game.add.bitmapData(625,650);
    zonaj1mini = game.add.bitmapData(475,500);
    zonaj2mini = game.add.bitmapData(475,500);
    //Dibujamos las zonas
    zonaj1.ctx.beginPath();
    zonaj1.ctx.rect(0,0,650,650);
    zonaj1.ctx.fillStyle = '#c12e2e';
    zonaj1.ctx.fill();

    zonaj2.ctx.beginPath();
    zonaj2.ctx.rect(0,0,650,650);
    zonaj2.ctx.fillStyle = '#34b9db';
    zonaj2.ctx.fill();

    zonaj1mini.ctx.beginPath();
    zonaj1mini.ctx.rect(0,0,775,775);
    zonaj1mini.ctx.fillStyle = '#c12e2e';
    zonaj1mini.ctx.fill();

    zonaj2mini.ctx.beginPath();
    zonaj2mini.ctx.rect(0,0,775,775);
    zonaj2mini.ctx.fillStyle = '#34b9db';
    zonaj2mini.ctx.fill();

    zona1 = game.add.sprite(1050, 150, zonaj1);
    zona2 = game.add.sprite(225, 150, zonaj2);
    zona1mini = game.add.sprite(1125, 225, zonaj1mini);
    zona2mini = game.add.sprite(300, 225, zonaj2mini);
    
    //Creamos el texto que sera el marcador
    text = game.add.text(game.world.centerX, game.world.centerY, marcadorj2+" - "+marcadorj1, 
    {
        font: "65px Times New Roman",
        fill: "#ff0000",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);

    //Creamos las dianas 
    //i=izquierda, d=derecha, a=arriba, c=centro, b=abajo
    dianaia = game.add.sprite(40, 100, 'diana');
    dianaic = game.add.sprite(5, 425, 'diana');
    dianaib = game.add.sprite(40, 750, 'diana');
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

    pelotas2.createMultiple(50, 'pelota');
    pelotas2.setAll('checkWorldBounds', true);
    pelotas2.setAll('outOfBoundsKill', true);

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
}

function update() 
{
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
    game.physics.arcade.collide(pared, pelotas);
    game.physics.arcade.collide(pared, pelotas2);
    game.physics.arcade.collide(pared2, pelotas);
    game.physics.arcade.collide(pared2, pelotas2);
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
            sprite.body.velocity.x = -150;       
        }
    
        if (teclas.right.isDown)
        {
            sprite.body.velocity.x = 150; 
        }

        if (teclas.up.isDown)
        {
            sprite.body.velocity.y = -150;
        }

        if (teclas.down.isDown)
        {
            sprite.body.velocity.y = 150;
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
            sprite2.body.velocity.x = -150;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            sprite2.body.velocity.y = -150;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            sprite2.body.velocity.y = 150;
        }

        if(game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            sprite2.body.velocity.x = 150;
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
        //Se termina el juego gana jugador 2
        sprite.body.position.x=1375;
        sprite.body.position.y=450;
        sprite2.body.position.x=525;
        sprite2.body.position.y=450;
        text.setText("Ha ganado el jugador 2");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
    }

    else if(marcadorj2==0)
    {
        //Se termina el juego gana jugador 1
        sprite.body.position.x=1375;
        sprite.body.position.y=450;
        sprite2.body.position.x=525;
        sprite2.body.position.y=450;
        text.setText("Ha ganado el jugador 1");
        sprite.body.velocity.x=0;
        sprite.body.velocity.y=0;
        sprite2.body.velocity.x=0;
        sprite2.body.velocity.y=0;
        pelotas.kill();
        pelotas2.kill();
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
        
        pelota.reset(sprite.x - 25, sprite.y - 25);
        
        game.physics.arcade.moveToPointer(pelota, 500);

        pelota.body.bounce.set(1);
    }

}

//Disparo pelotas jugador 2
function fire2(sprite2)
{

    if (game.time.now > nextFire2 && pelotas2.countDead() > 0)
    {
        nextFire2 = game.time.now + fireRate;

        var pelota2 = pelotas2.getFirstDead();

        pelota2.reset(sprite2.x - 25, sprite2.y - 25);

        pelota2.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(sprite2.angle, 500));

        pelota2.body.bounce.set(1);
    }

}

function golpeadiana2(pelota2)
{
    pelota2.kill();
    compruebadianas2++;
}

function golpeadiana(pelota)
{
    pelota.kill();
    compruebadianas++;
}

function golpeajugador2(sprite2,pelota)
{
    golpe2=true;
    pelota.kill();
}

function golpeajugador(sprite,pelota2)
{
    golpe=true;
    pelota2.kill();
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
    z1xd=z1xd-75;
    z1xi=z1xi+75;
    z1ya=z1ya+75;
    z1yb=z1yb-75;
    zona1.x=2000;
    zona1.y=2000;
}

function reducezona2(zona2)
{
    z2xd=z2xd-75;
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
        sprite.body.position.x=1375;
        sprite.body.position.y=450;
        vida=0;
        golpe=false;
        tiempo=0;
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
    }
}