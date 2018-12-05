# GGroup

Carlos Fregenal Sotelo // c.fregenal.2016@alumnso.urjc.es / cfregenal97@gmail.com  / https://github.com/CarlosFregenal
Tomas Perez Martinez // t.perez.2016@alumnos.urjc.es  /  tomas22tomas@gmail.com / https://github.com/tovilu       
Adrian Pastor Rubio // a.pastorr.2016@alumnos.urjc.es / adrip_97@hotmail.com  / https://github.com/AdrianPastor

## Fase 1
**Nombre del juego**: GentleBall.  
  
**Descripción**: GentleBall es un juego 2D en vista cenital basado en el popular juego del balón prisionero donde dos jugadores se enfrentan para tratar de sacar al otro de la pista. Para ello utilizaran diferentes tipos de pelotas como proyectil. 
  
**Mecánicas**: Cada jugador tendrá un número ilimitado de pelotas normales pero tendrán un tiempo de recarga entre una y la siguiente. Las pelotas normales empujarán al enemigo si está desprotegido y le subirá un porcentaje de empuje que le hará más vulnerable a los siguientes golpes. Habrá objetos especiales que aparecerán aleatoriamente y que otorgarán distintas ventajas. Cada jugador dispondrá de tres vidas, perdiendo una cada vez que caiga al foso. Cada jugador también dispondrá de un escudo que rebotará las pelotas, sin embargo, seguirá siendo empujado y subirá su porcentaje pero en menor medida. El jugador podrá hacer más pequeña la zona del rival si consigue dar a las tres dianas que éste tiene detrás. También a los lados del mapa habrá dos plataformas que se mueven horizontalmente y en las que los jugadores podrán rebotar las pelotas.  
  
  **_Esquema del mapa_**
  ![alt text](https://i.imgur.com/b2VC3X5.png)  
    
**Diseño artístico**: El estilo del juego sería un dibujo vectorial simple pero claro como podría ser el juego zombs royale.io. Hemos elegido este estilo ya que la característica principal de nuestros personajes es el sombrero que llevan puesto.  


![alt text](https://cdn.apkmonk.com/images/com.zombs.royale.png)  
  *ZombsRoyale.io*

## Fase 2
![alt text](https://i.imgur.com/NTGAcNP.png)
Este es nuestro menú principal desde el cual pulsando el botón "Controls" accedemos a los controles de los jugadores y pulsando el botón "Start" comienza una partida.

![alt text](https://i.imgur.com/gQyD6b9.png)
En los controles podemos ver con qué teclas podemos manejar cada personaje.

![alt text](https://i.imgur.com/OM6TZCb.png)
Aquí podemos ver lo que es el propio juego en el que podemos distinguir las 2 zonas de los jugadores, las barreras, las dianas, la puntuación y el porcentaje de cada jugador. Cabe destacar que en cualquier momento podremos salir del juego pulsando el botón "Exit" que nos devolverá al menú principal.

![alt text](https://i.imgur.com/qv5zKnu.png)
Cuando la partida acaba sale en pantalla quién ha ganado y Aparece un botón "Restart" que hara que el juego se vuelva a iniciar.

## Fase 3  
**Diagrama de Estados**  
![alt text](https://i.imgur.com/n6iVQD9.png)  
  
**Diagrama de Clases**    
![alt text](https://i.imgur.com/fh3BBzA.png)  
  
**Funcionamiento**
Para iniciar el servidor de nuestro juego debemos entrar en la consola de comandos y situarnos en la carpeta target de nuestro juego, ahí ejecutaremos el codigo "java -jar Gentleball-2.jar" y con esto nuestro servidor se habrá iniciado.
![alt text](https://i.imgur.com/XWdJyio.png)

Ponemos en el navegador la ip del ordenador que haya creado el servidor, al entrar nos aparecerá una ventana que nos pedirá volver a meter dicha ip para así no tener que ir cambiando manualmente en el codigo si el servidor cambia de ordenador.
![alt text](https://i.imgur.com/ygVyhRa.png)

Una vez en el juego al darle al boton start podremos jugar offline sin que el servidor influya en el juego o entrar al modo online que nos llevará a un lobby en el cual podremos logearnos con un nombre de usuario
![alt text](https://i.imgur.com/LOfxN4d.png)

Una vez el usuario se logee, su nombre aparecerá en una lista justo debajo y el login desaparecerá para evitar que una misma persona cree múltiples usuarios
![alt text](https://i.imgur.com/1DHJRCE.png)

Si el servidor se desconecta aparecerá un cuadro en pantalla que indicará que así ha sido y habilitará un botón para que el jugador vuelva al menú principal.
![alt text](https://i.imgur.com/L3JTeI8.png)



En la carpeta target se generará un archivo txt llamado jugadores en el cual se almacenarán todos los jugadores que se han conectado alguna vez, esto lo utilizaremos en un futuro para crear una tabla de clasificación con un sistema de puntuación que implementaremos.


