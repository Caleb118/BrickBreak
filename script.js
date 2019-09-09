        var motion;
        var g = 1;
        var start = 0;
        var life = 2;
        var level = 1;
        var hits = 0;
        var breaks = 0;
        var curBreaks = 0;
        var paddles = 0;
        var m = 0;      
        
        function loop () {
                bMotion();      
                bBoundry();
                checkCollsion();
                checkWin(curBreaks);
                scoreUpdate();
                bgmusic();
                
                if (g == 1) {
                        setTimeout(loop, 2);
                       // window.requestAnimationFrame(loop);
                }
       }

       function bgmusic() {
               if (m == 0 ) {
                new Audio('sounds/music.mp3').play()
                m++;
               }
                
       }

       function scoreUpdate() {
                var score = ((level * 50) + (hits * 5) + (breaks * 20) + (paddles * 100)) * 1000;
                document.getElementById("total3").innerHTML = "Score: " + parseInt(score);
                document.getElementById("score").innerHTML = parseInt(score);
                document.getElementById("tScore").value = parseInt(score); 
                
       }

       function checkWin() {
                if (level <= 8) {
                        brickNum = (level * 10);
                } else {
                        brickNum = 90;
                }
                var ball = document.getElementById("theball");
                
                if (brickNum == curBreaks) {
                        level++;
                        start = 0;
                        curBreaks = 0;
                        motion = "still";
                        new Audio('sounds/win.mp3').play()
                        ball.style.left = "50%";
                        ball.style.bottom = "10%";
                        document.getElementById("bHolder").innerHTML = "";
                        createBrick();
                        document.getElementById("total2").innerHTML = "Level: " + level;

                }

       }

       function checkCollsion() {
                let i = 1
                if (level <= 8) {
                        brickNum = (level * 10);
                } else {
                        brickNum = 90;
                }
               
                while (i <= brickNum) {
                        
                        var r1 = document.getElementById("brick"+i).getBoundingClientRect();
                        
                        var r2 = document.getElementById("theball").getBoundingClientRect();

                        
                        if (r2.top <= r1.bottom && r2.left >= r1.left && r2.right <= r1.right && r2.bottom >= r1.top && document.getElementById("brick"+i).style.visibility !== "hidden") {
                                document.getElementById("brick"+i).style.visibility = "hidden";
                                breaks++;
                                curBreaks++;
                                new Audio('sounds/brick_hit.mp3').play()
                                if (motion == "upright") {
                                        motion = "downright";
                                } else if (motion == "upleft") {
                                        motion = "downleft";   
                                } else if (motion == "downleft") {
                                        motion = "upleft";
                                } else if (motion == "downright") {
                                        motion = "upright";
                                }

                                
                        }
                i++;
                }

       }


       function createBrick() {
                if (level <= 8) {
                        brickNum = (level * 10);
                } else {
                        brickNum = 90;
                }
                
                let i = 1;

                while (i <= brickNum) {
                        var name = 'brick' + i;
                        document.getElementById("bHolder").innerHTML += "<img id=\"" + name + "\" class=\"brick\" src=\"img/brick.png\">";
                i++;    
                }

                
       }

       function bMotion() {
                if (motion == "upright") {
                        ballUpRight();
                } else if (motion == "downright") {
                        ballDownRight();
                } else if (motion == "upleft") {
                        ballUpLeft();
                } else if (motion == "downleft") {
                        ballDownLeft();
                } else if (motion == "still") {

                }
       }

       function bBoundry() {  
                var ball = document.getElementById("theball");
                var screen = document.getElementById("tGame");
                var paddle = document.getElementById("thepad");
               if (parseInt(ball.style.top) <= 0) {
                       hits++;
                       new Audio('sounds/wall.mp3').play()
                       if (motion == "upright") {
                               motion = "downright";
                               
                       } else if (motion == "upleft") {
                               motion = "downleft";
                               
                       }
               } else if (parseInt(ball.style.left) + (ball.offsetWidth) > screen.offsetWidth) {
                        new Audio('sounds/wall.mp3').play()
                        hits++;
                        if (motion == "upright") {
                                motion = "upleft";
                        } else if (motion == "downright") {
                                motion = "downleft";   
                        }
               } else if (parseInt(ball.style.left) <= 0) {
                        new Audio('sounds/wall.mp3').play()
                        hits++;
                        if (motion == "downleft") {
                                motion = "downright";         
                        } else if (motion == "upleft") {
                                motion = "upright";
                        }
                       
               } else if (parseInt(ball.style.top) + (ball.offsetHeight) >= (screen.offsetHeight - (screen.offsetHeight * 0.05))) {
                        if (parseInt(ball.style.left) + ball.offsetWidth / 2 > parseInt(paddle.style.left) && parseInt(ball.style.left) + ball.offsetWidth / 2 < (parseInt(paddle.style.left) + paddle.offsetWidth )) {
                               paddles++;
                               new Audio('sounds/paddle_hit.mp3').play()
                                if (motion == "downleft") {
                                        motion = "upleft";
                                } else if (motion == "downright") {
                                        motion = "upright";
                                }
                       } else {
                                if (life > 0) {
                                        ball.style.left = "50%";
                                        ball.style.bottom = "20%";
                                        document.getElementById("total").innerHTML = "Lives: " + life--;
                                        motion = "upright";
                                        new Audio('sounds/life_lost.mp3').play()
                                } else {
                                        g = 0;
                                        new Audio('sounds/win.mp3').play()
                                        gameover();
                                }
                       }    
               }
       }

       function ballspeed() {
               if (level <= 2) {
                       return 1;
               } else if (level >=  3) {
                       return 2;
               }
       }
       function ballUpRight() {
                var ball = document.getElementById("theball");
                ball.style.top = parseInt(ball.style.top) - ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';
       }

       function ballDownRight() {
                var ball = document.getElementById("theball");
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) + ballspeed() + 'px';

        }
        function ballUpLeft() {
                var ball = document.getElementById("theball");
                ball.style.top = parseInt(ball.style.top) - ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px';
        }
        function ballDownLeft() {
                var ball = document.getElementById("theball");
                ball.style.top = parseInt(ball.style.top) + ballspeed() + 'px';
                ball.style.left = parseInt(ball.style.left) - ballspeed() + 'px';
        }
       

        function leftArrowPressed() {
        var element = document.getElementById("thepad");
            if (parseInt(element.style.left) > 0) {
                element.style.left = parseInt(element.style.left) - 10 + 'px';
            }
           
            
        }

        function rightArrowPressed() {
            var element = document.getElementById("thepad");
            var screen = document.getElementById("tGame");
            if (parseInt(element.style.left) + (element.offsetWidth) < screen.offsetWidth) {
                element.style.left = parseInt(element.style.left) + 10 + 'px';

                if (start == 0) {
                        
                        
                        motion = "upright";
                        
                        start = 1;
                        
                        
                }
            }
           

        }


        function moveSelection(evt) {
            switch (evt.keyCode) {
                case 37:
                leftArrowPressed();
                break;
                case 39:
                rightArrowPressed();
                break;
                }
        };

        function docReady() {
                window.addEventListener('keydown', moveSelection);
                
        }

                
        function gameover() {
                document.getElementById("tGame").style.display = "none";
                document.getElementById("gOver").style.display = "block";
                
        }
        
        function gStart() {
                document.getElementById("sTart").style.display = "none";
                document.getElementById("tGame").style.display = "block";
                createBrick();
                var ball = document.getElementById("theball");
                ball.style.left = "50%";
                ball.style.bottom = "20%";
                motion = "still";
                setTimeout(loop, 1000);
        }

        function gInfo() {
                document.getElementById("sTart").style.display = "none";
                document.getElementById("sInfo").style.display = "block";
        }
        function gMenu() {
                document.getElementById("sTart").style.display = "block";
                document.getElementById("sInfo").style.display = "none";
        }

        function gmMenu() {
                document.getElementById("sTart").style.display = "block";
                document.getElementById("gOver").style.display = "none";
        }
        
        
        