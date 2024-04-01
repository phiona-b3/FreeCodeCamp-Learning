//The next step is to target the paragraph element inside the .checkpoint-screen element.
//Use document.querySelector and the child combinator > to target the paragraph element.

//The Canvas API can be used to create graphics in games using JavaScript and the HTML canvas element.
//You will need to use the getContext method which will provide the context for where the graphics will be rendered.

//The innerWidth property is a number that represents the interior width of the browser window.
//The innerWidth property is a number that represents the interior width of the browser window.

//In your platformer game, the main player will need to jump between the different platforms. When the player jumps, you will need to apply gravity to bring them back down.

//In the game, the player will have the opportunity to cross different checkpoints. You will need to keep track of the status for the checkpoint collision detection.

//As you are designing the game, you will need to make sure that the size of the elements in the game are responsive and adapt to different screen sizes.

//The width and the height of the main player, platforms and checkpoints will be proportional sized relative to the innerHeight of the the browser screen. The goal is to make the game responsive and visually consistent across different screen sizes.

//Inside your Player class, you will need to define the player's position, velocity, width, and height values. All of these values will be defined inside the constructor method.

//You need to use the proportionalSize function here to make sure that the player's position is always proportional to the screen size. This is important because you want the player to be able to move around the screen regardless of the screen size.

//The velocity property will be used to store the player's speed in the x and y directions.

//You are using the proportionalSize() function here to set the width and height properties of your class to be proportional to the height of the screen.

//The next step is to create a draw() method, which will be responsible for creating the player's width, height, position, and fill color.

//The next step is to create an update() method which will be responsible for updating the player's position and velocity as it moves throughout the game.

//Inside the update() method, call the draw() method to ensure that the player is continually drawn on the screen as the game updates.

//When the player moves to the right, you will need to adjust its velocity.

//When the player jumps up, you will need to add the logic for adjusting its velocity.

//To fix that, you will need to add a condition to stop the player from falling past the height of the canvas.