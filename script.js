//////////////////////////////////////////////////////
///    BRICK BREAK CREATED BY CALEB HINTON        ///
/////////////////////////////////////////////////////

//I wish I could say this was a simple project but I wanted the game to be universal on all screen sizes
//you will notice through this project I never used a "px" to define the size of any element, in CSS all the divs
//are based on percentages, while in this we use the elements width and height to calculate pixels

//Define variables for the game
//Most are used to calculate High Score
//Motion defines the direction of the ball 
//g is an on/off switch for the game loop
//level is your current level (this is used for brick math later on)
//M is used to prevent multiple background tracks from playing at the same time
//curbreaks is a variable where i keep the number of bricks you have broken per leve
//larrowpress & rarrowpress are on off switches for our paddle (which we will change with a key event later)

var motion;
var g = 1;
var life = 2;
var level = 1;
var hits = 0;
var breaks = 0;
var curBreaks = 0;
var paddles = 0;
var m = 0;     
var lArrowPressed = 0;
var rArrowPressed = 0; 


//This is the game loop, it is constantly updating all the functions, it is able to run 
//recursively but also shut off given a variables (ie g) this is used for the end of the game
//requestAnimationFrame is commented it, it can be used the same as setTimeout but will refresh 
//a few miliseconds faster (ie interchangable).

function loop () {
        bMotion();      
        bBoundry();
        checkCollision();
        checkWin(curBreaks);
        scoreUpdate();
        bgmusic();
        rightArrowMovement();
        leftArrowMovement();
        
        if (g == 1) {
                setTimeout(loop, 1);
                // window.requestAnimationFrame(loop);
        }
}

//This function is for when the player restarts the game, it resets all the stats(level + score)
//the element ID bHolder is becoming nothing because it is resetting the player field
//bHolder is the div that contains the brick elements
//we then will update score div to represent 0 and set the level and lives back to their updated settings
//We will aslo update the leve background

function newLife() {
        life = 3;
        paddles = 0;
        curBreaks = 0;
        breaks = 0;
        hits = 0;
        level = 1;
        levelbg();
        g = 1;
        document.getElementById("bHolder").innerHTML = "";
        document.getElementById("total2").innerHTML = "Level: " + level;
        document.getElementById("total").innerHTML = "Lives: " + life;
        document.getElementById("score").innerHTML = "0";
}

//This function is for the background music, I chose a soundtrack I thought would give an arcade feel to it
//as we mentions in the first comment, the M variable is used as a switch to stop the script from ever playing this
//track over again, i chose a track that is 17 minutes long.

function bgmusic() {
        if (m == 0 ) {
                new Audio('sounds/music.mp3').play()
        m = 1;
        }
        
}

//This function is called when you die, it pauses the game to allow you to see where you missed the ball
//Javascript does not really have a sleep function so this is the best i could do

function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                        break;
                }
        }
}

//This function is constantly being ran in the main game loop, it is updated the score with the math as seen 
//below, I chose this math because I remember is old arcade games the scores were rediculously high
//we will then constantly update the score div to the appropriate score

function scoreUpdate() {
        var score = ((level * 50) + (hits * 5) + (breaks * 20) + (paddles * 100)) * 1000;
        document.getElementById("total3").innerHTML = "Score: " + parseInt(score);
        document.getElementById("score").innerHTML = parseInt(score);
        document.getElementById("tScore").value = parseInt(score); 
}

//This function is used to reset the ball in the place, this function is ran when you start a new life,
//start a new game, or start the first iteration of the game
//there have been quite a few problems with starting the ball in the correct position as it turns out
//you cannot position the ball by a percentage when you're modifying it by pixels

function resetBall() {
        var x = document.getElementById("tGame");
        var ball = document.getElementById("theball");
        var gw = (document.getElementById("tGame").offsetWidth / 2);
        var gh = (document.getElementById("tGame").offsetHeight * 0.80);
        ball.style.top = gh + "px";
        ball.style.left = gw + "px";
        motion = "upleft";
}

//This function represents our Brick Math, we are using this to calculate just how many bricks we want on the field
//we also should understand our brick math, brick math is level * 10, so level 3 would present 30 bricks
//however this is only true up until level 6 and any level after that will always result in
//70 bricks, this is to keep the bricks from overloading the game

function brickNum() {
        if (level <= 7) {
                return (level * 10);
        } else {
                return  70;
        }
}

//This function is checking to see if you have completed the level
//if you have completed the level it will raise the level variable, reset the player field, reset the ball
//and reset the current breaks 
//as mentioned in the first comment variable curbreaks is the current brick breaks on this level
//now when we compare the number of bricks(brickmath) to our current breaks and it matches
//we will consider it a win and go up one level

function checkWin() {
        //if the number of bricks on the field is equal to the number of bricks broken then we run this statemnt
        if (brickNum() == curBreaks) {
                level++;
                curBreaks = 0;
                resetBall();
                new Audio('sounds/win.mp3').play()
                document.getElementById("bHolder").innerHTML = "";
                levelbg();
                createBrick();
                document.getElementById("total2").innerHTML = "Level: " + level;
        }
}

//This function is checking the collision between the ball and the bricks we generated
//to do this we have used getBoundClientRect to get the bounds of the bricks and the ball
//the ball is a div whose border radius is set to 50% on all sides with a matching width and height
//when the right side of our ball overlaps the left side of the brick and vice versa for all 4 sides
//then we can assume that we have made a collision and we will update the balls moment to the reflecting
//direction

function checkCollision() {
        //all bricks are given an id (e.x. brick1 brick2 brick3 brick4) you can think of variable i as a
        //starting point for our loop
        let i = 1;

        //We have to do brick math again so we can calculate the number of bricks for a loop below

        
        //Now we have a loop that will constantly run through every brick and add bounds
        while (i <= brickNum()) {
                //We will create the bounds of the brick and the ball for every brick
                var r1 = document.getElementById("brick"+i).getBoundingClientRect();
                var r2 = document.getElementById("theball").getBoundingClientRect();

                
                //This if statement is assuming the ball has collided with a brick (as mentioned in the comment block above)
                //We have also added a condition that check visibility and if its hidden it ignores the bounds and information on the brick
                //we used the css style visibility intead of display, because we are used images (inline-blocks)
                //if we were to use display, ever block iteration after the one hidden will shift left in its place
                //this way will keep the position of the div and just not show it anymore
                //as mentioned above in function checkWin() and newLife() we will clear the field at the end of the game

                if (r2.top <= r1.bottom && r2.left <= r1.right && r2.right >= r1.left && r2.bottom >= r1.top && document.getElementById("brick"+i).style.visibility !== "hidden") {
                        document.getElementById("brick"+i).style.visibility = "hidden";
                        breaks++;
                        curBreaks++;
                        new Audio('sounds/brick_hit.mp3').play()

                        //This section of switch statments tell us what to do with the ball if we collide 
                        //this provides the logic of bouncing for block collsiions

                        switch(motion) {
                                case "upright":
                                        motion = "downright";
                                break;
                                case "upleft":
                                        motion = "downleft";
                                break;
                                case "downleft":
                                        motion = "upleft";
                                break;
                                case "downright":
                                        motion = "upright";
                                break;
                                case  "up":
                                        motion = "down";
                                break;
                                case "uprightc":
                                        motion = "downrightc";
                                break;
                                case "upleftc":
                                        motion = "downleftc";
                                break;
                                case "downleftc":
                                        motion = "upleftc";
                                break;
                                case "downrightc":
                                        motion = "uprightc";
                                break;
                        }
                }
        //I know this looks out of place but it is important!
        //This is used to increase our loop
        i++;
        }
}

//This function is used to change the background-image per level, I thought this would give it a nice touch and feel like
//you're actually playing a new level and not some randomly generated blocks of the same div
//we will use background images I have put in the /img/backgrounds folder for levels 1 - 10
//after level 10 we will randomly chose a background for any level you continue after that
//(This is for the pros considering if anybody actually plays my game this long

function levelbg() {
        if (level < 11) {
                document.getElementById("tGame").style.backgroundImage = "url('img/backgrounds/" + level + ".jpg')";
        } else {
                let bgnum = Math.floor(Math.random() * 10) + 1;
                document.getElementById("tGame").style.backgroundImage = "url('img/backgrounds/" + bgnum + ".jpg')";  
        }
}

//The following function is called at every new level start, we will use this function to create the bricks of the field
//using the brick math we talked about above we will generate images inside the bHolder div, each with a width of 10%
//as defined by the class we will also give them a random image of 1-5 and we will use preset brick assets
//I have placed in the bricks folder, we will also give them all a special id so we can call them in the checkCollision fnction
function createBrick() {  
        let i = 1;

        while (i <= brickNum()) {
                let name = 'brick' + i;
                let bgnum = Math.floor(Math.random() * 5) + 1;
                document.getElementById("bHolder").innerHTML += "<img id=\"" + name + "\" class=\"brick\" src=\"img/bricks/" + bgnum + ".png\">";
        i++;    
        }
}

//This function is called constantly in the main loop here we will decide what to do with the motion variables
//We will move the ball by adding or removing 1px to the style.left or style.top of the ball
//the ball div is set at position: absolute; as defined by the css page

function bMotion() {
        var ball = document.getElementById("theball");
        switch (motion) {
                case "upright":
                ball.style.top = parseInt(ball.style.top) - ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';
                break;

                case "downright":
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';
                break;

                case "upleft":
                ball.style.top = parseInt(ball.style.top) - ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px';
                break;

                case "downleft":
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px';
                break;

                case "up":
                ball.style.top = parseInt(ball.style.top) - ballspeed() + 'px';
                break;

                case "down":
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                break;

                case "uprightc":
                ball.style.top = parseInt(ball.style.top) - ballspeed(2) + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';   
                break;

                case "upleftc":
                ball.style.top = parseInt(ball.style.top) - ballspeed(2) + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px';
                break;

                case "downrightc":
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';
                break;

                case "downleftc":
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px'; 
                break;
        }
}


//This is the first function I wrote when starting this project... and probably the most important
//aside from creating the boundry of the game this is responsible for the bounce logic as well
//this ALSO is responsible for calculating if you have hit the paddle or if you have lost a life
//the main IF of this page switches between all four walls, 1-3 being simple reflections of bounce
//however wall four (bottom wall) we look for the paddle location, and calculate a center location of the ball
//if the balls center location does not match a number between the left side and the right side of the paddle
//then we can assume a loss (we are only calculating for the x axis )

function bBoundry() {  
        //Here we are going to define the ball, the size of the parent div (the game holder) and the paddle
        var ball = document.getElementById("theball");
        var screen = document.getElementById("tGame");
        var paddle = document.getElementById("thepad");

        //This is the reflection logic of the top wall
        if (parseInt(ball.style.top) <= 0) {

                //This hits++ is where we add to the highscore for everytime the ball bounces
                //The audio plays the sound of the ball hitting the wall

                hits++;
                new Audio('sounds/wall.mp3').play()

                switch (motion) {
                        case "upright":
                        motion = "downright";
                        break;

                        case "upleft":
                        motion = "downleft";
                        break;

                        case "up":
                        motion = "down";
                        break;

                        case "upleftc":
                        motion = "downleftc";
                        break;

                        case "uprightc":
                        motion = "downrightc";
                        break;
                }

        //This is the reflection logic of the right wall
        } else if (parseInt(ball.style.left) + (ball.offsetWidth) > screen.offsetWidth) {

                //This hits++ is where we add to the highscore for everytime the ball bounces
                //The audio plays the sound of the ball hitting the wall

                new Audio('sounds/wall.mp3').play()
                hits++;

                switch (motion) {
                        case "upright":
                        motion = "upleft";
                        break;

                        case "downright":
                        motion = "downleft";
                        break;

                        case "uprightc":
                        motion = "upleftc";
                        break;

                        case "downrightc":
                        motion = "downleftc";
                        break;
                } 

        //This is the logic of the left wall
        } else if (parseInt(ball.style.left) <= 0) {

                //This hits++ is where we add to the highscore for everytime the ball bounces
                //The audio plays the sound of the ball hitting the wall

                new Audio('sounds/wall.mp3').play()
                hits++;

                switch (motion) {
                        case "downleft":
                        motion = "downright";
                        break;

                        case "upleft":
                        motion = "upright";
                        break;

                        case "upleftc":
                        motion = "uprightc";
                        break;

                        case "downleftc":
                        motion = "downrightc";
                        break;
                }

        //This is the logic of the paddle + detects when you dont catch the ball & tells what to do if you die
        } else if (parseInt(ball.style.top) + (ball.offsetHeight) >= (screen.offsetHeight - (screen.offsetHeight * 0.05))) {

                // this if statement detects when the balls center hits the paddle
                if (parseInt(ball.style.left) + ball.offsetWidth / 2 > (parseInt(paddle.style.left) - 10) && parseInt(ball.style.left) + ball.offsetWidth / 2 < (parseInt(paddle.style.left) + paddle.offsetWidth + 10)) {
                        
                        //here we increment the paddle variable and play a paddle sounds
                        paddles++;
                        new Audio('sounds/paddle_hit.mp3').play()

                        //to understand these variables you have to understand how the paddle works
                        //the paddle is broken up into 5 parts
                        //left - left middle - center - right middle - right
                        //Depending on which part the ball strikes affects the direction the ball will reflect
                        //below we are getting the position of the ball, and these 5 divs

                        var ball = document.getElementById("theball").getBoundingClientRect();
                        var pl = document.getElementById("pLeft").getBoundingClientRect();
                        var plm = document.getElementById("pLeftM").getBoundingClientRect();
                        var pc = document.getElementById("pCenter").getBoundingClientRect();
                        var prm = document.getElementById("pRightM").getBoundingClientRect();
                        var pr = document.getElementById("pRight").getBoundingClientRect();
                        var bC = (ball.left + (document.getElementById("theball").offsetWidth / 2));

                        //Here is the logic for the div hits, we first make sure the ball has hit in
                        //the div specified then we change the motion

                        if (bC > (pl.left - 20) && bC < pl.right) {
                                motion = "upleft";     
                        } else if (bC > plm.left && bC < plm.right) {
                                motion = "upleftc";
                        } else if (bC > pc.left && bC < pc.right) {
                                motion = "up";
                        } else if (bC > prm.left && bC < prm.right) {
                                motion = "uprightc";
                        } else if (bC > pr.left && bC < (pr.right + 20)) {
                                motion = "upright";
                        } 

                //Here we decide that the ball did not land on any of the paddle or interior divs, so we 
                //can assume that you have died

                } else {

                        //We are checking your lifes, this statement assumes you have more lifes

                        if (life > 0) {

                                //Here we will pause the game for half a second to show the player where
                                //they died, we will reset the ball position, update the lives display at top
                                //and play a death sound effect

                                sleep(500);
                                resetBall();
                                document.getElementById("total").innerHTML = "Lives: " + life--;
                                new Audio('sounds/life_lost.mp3').play()
                        } else {
                                
                                //Assuming you have no more lives we will set g to 0
                                //if you remeber in the beginning where we defined variables g is the switch
                                //that cuts off the game loop, so we will stop the game loop, play a sound effect
                                //and run function gameover

                                g = 0;
                                new Audio('sounds/win.mp3').play()
                                gameover();
                        }
                }    
        }
}


//The function below is used in the function bMotion the reason we call this function is so that if we chose
//on harder levels we could increase the speed of the ball, all we would have to do is change
//variable speed base on level

function ballspeed(param) {
        var speed = 1;

        if (param == 2) {
                return speed + 1;
        } else {
                return speed;
        }
}

//These two function are constantly being run on the main loop 
//Each one increase or decreases the left position causes the div to appear to me
//Inside of each one we have if statments that make sure the paddle is not going over
//the edge of the game that we have defined (parent div)
//the variables larrowpressed and rarrowpressed are on off switchs
//the reason we do this method instead of just moving it on keydown is because
//by default keydown has a 1 second delay before it moves at full speed and this can make
//playing the game dificult, so using this method we are able to have it instantly move to the left or right
//on keydown, then we flip the switch off (variables) on key up

function leftArrowMovement() {
        if (lArrowPressed == 1) {
                var element = document.getElementById("thepad");

                if (parseInt(element.style.left) > 0) {
                        element.style.left = parseInt(element.style.left) - 2 + 'px';
                }
        }      
}

function rightArrowMovement() {
        if (rArrowPressed == 1) {
                var element = document.getElementById("thepad");
                var screen = document.getElementById("tGame");
                if (parseInt(element.style.left) + (element.offsetWidth) < screen.offsetWidth) {
                        element.style.left = parseInt(element.style.left) + 2 + 'px';

                }
        }
}

//This function is run in the body tag onload, this starts the key events
function docReady() {
        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
        
}

//As mentioned in the comment block above these two are what activated and deactivates the variable switch that
//controls the paddle

function keyDown(evt) {
        switch (evt.keyCode) {
        case 37:
        lArrowPressed = 1;
        break;
        case 39:
        rArrowPressed = 1;
        break;
        }
};

function keyUp(evt) {
        switch (evt.keyCode) {
        case 37:
        lArrowPressed = 0;
        break;
        case 39:
        rArrowPressed = 0;
        break;
        }
};

//This function is run when the game starts, it hides the menu div shows the game container(parent div) 
//runs the functions needed to start the game

function gStart() {
        document.getElementById("sTart").style.display = "none";
        document.getElementById("tGame").style.display = "block";
        createBrick();
        levelbg();
        resetBall();
        loop();
}

////////////////////////////////////////////////////////
//The functions below this line are nothing more then
//basic functions used to show or hide divs in the menu
//Thank you so much for taking the time to read through my documentation
////////////////////////////////////////////////////////

function gameover() {
        document.getElementById("tScore").value = score;
        document.getElementById("tGame").style.display = "none";
        document.getElementById("gOver").style.display = "block";
        document.getElementById("name").focus();
        document.getElementById("name").select();
}
function gScores() {
        document.getElementById("sTart").style.display = "none";
        document.getElementById("gScores").style.display = "block";
}
function gInfo() {
        document.getElementById("sTart").style.display = "none";
        document.getElementById("sInfo").style.display = "block";
}
function gMenu() {
        document.getElementById("sTart").style.display = "block";
        document.getElementById("sInfo").style.display = "none";
}
function gMenu2() {
        document.getElementById("sTart").style.display = "block";
        document.getElementById("gScores").style.display = "none";
}

function gmMenu() {
        document.getElementById("sTart").style.display = "block";
        document.getElementById("gOver").style.display = "none";
        newLife();
}


