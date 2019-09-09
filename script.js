var vTopLeft = 0;
var vTopCenter = 0;
var vTopRight = 0;
var vMiddleLeft = 0;
var vMiddleCenter = 0;
var vMiddleRight = 0;
var vBottomLeft = 0;
var vBottomCenter = 0;
var vBottomRight = 0;
var plays = 0;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
              break;
            }
        }
    }

    function roboplay() {
        x = Math.floor(Math.random() * 9) + 1
        switch (x) {
            case 1:
            if (vTopLeft == 0) {
                document.getElementById('topleft').style.backgroundImage="url(images/o.png)";
                vTopLeft = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 2: 
            if (vTopCenter == 0) {
                document.getElementById('topcenter').style.backgroundImage="url(images/o.png)";
                vTopCenter = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 3:
            if (vTopRight == 0) {
                document.getElementById('topright').style.backgroundImage="url(images/o.png)";
                vTopRight = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 4: 
            if (vMiddleLeft == 0) {
                document.getElementById('middleleft').style.backgroundImage="url(images/o.png)";
                vMiddleLeft = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 5:
            if (vMiddleCenter == 0) {
                document.getElementById('middlecenter').style.backgroundImage="url(images/o.png)";
                vMiddleCenter = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 6:
            if (vMiddleRight == 0) {
                document.getElementById('middleright').style.backgroundImage="url(images/o.png)";
                vMiddleRight = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 7:
            if (vBottomLeft == 0) {
                document.getElementById('bottomleft').style.backgroundImage="url(images/o.png)";
                vBottomLeft = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 8:
            if (vBottomCenter == 0) {
                document.getElementById('bottomcenter').style.backgroundImage="url(images/o.png)";
                vBottomCenter = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            case 9:
            if (vBottomRight == 0) {
                document.getElementById('bottomright').style.backgroundImage="url(images/o.png)";
                vBottomRight = 2;
                checkwin();
            } else {
                roboplay();
            }
            break;
            }
        }
        function checkwin() {
             if (vTopLeft == 1 && vTopCenter == 1 && vTopRight == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vMiddleLeft == 1 && vMiddleCenter == 1 && vMiddleRight == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vBottomLeft == 1 && vBottomCenter == 1 && vBottomRight == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopLeft == 1 && vMiddleLeft == 1 && vBottomLeft == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopCenter == 1 && vMiddleCenter == 1 && vBottomCenter == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopRight == 1 && vMiddleRight == 1 && vBottomRight == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopLeft == 1 && vMiddleCenter == 1 && vBottomRight == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopRight == 1 && vMiddleCenter == 1 && vBottomLeft == 1) {
                document.getElementById("ptext").innerHTML = "Good job, you win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopLeft == 2 && vTopCenter == 2 && vTopRight == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vMiddleLeft == 2 && vMiddleCenter == 2 && vMiddleRight == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vBottomLeft == 2 && vBottomCenter == 2 && vBottomRight == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopLeft == 2 && vMiddleLeft == 2 && vBottomLeft == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopCenter == 2 && vMiddleCenter == 2 && vBottomCenter == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopRight == 2 && vMiddleRight == 2 && vBottomRight == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopLeft == 2 && vMiddleCenter == 2 && vBottomRight == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (vTopRight == 2 && vMiddleCenter == 2 && vBottomLeft == 2) {
                document.getElementById("ptext").innerHTML = "Sorry, but you did not win!";
                document.getElementById('popup').style.display = 'block';
            } else if (plays == 5) {
                document.getElementById("ptext").innerHTML = "Sorry it was a tie!";
                document.getElementById('popup').style.display = 'block';
            }
            

        }
        function GoPlay(value, place, robo) {
            if (robo == 2) {
                
            } else if (value == 0) { 
                //Play the game
                plays = plays + 1;
                switch(place) {
                    case 1:
                    document.getElementById('topleft').style.backgroundImage="url(images/x.png)";
                    vTopLeft = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 2:
                    document.getElementById('topcenter').style.backgroundImage="url(images/x.png)";
                    vTopCenter = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 3:
                    document.getElementById('topright').style.backgroundImage="url(images/x.png)";
                    vTopRight = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 4:
                    document.getElementById('middleleft').style.backgroundImage="url(images/x.png)";
                    vMiddleLeft = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 5:
                    document.getElementById('middlecenter').style.backgroundImage="url(images/x.png)";
                    vMiddleCenter = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 6:
                    document.getElementById('middleright').style.backgroundImage="url(images/x.png)";
                    vMiddleRight= 1;
                    checkwin();
                    roboplay();
                    break;
                    case 7:
                    document.getElementById('bottomleft').style.backgroundImage="url(images/x.png)";
                    vBottomLeft = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 8:
                    document.getElementById('bottomcenter').style.backgroundImage="url(images/x.png)";
                    vBottomCenter = 1;
                    checkwin();
                    roboplay();
                    break;
                    case 9:
                    document.getElementById('bottomright').style.backgroundImage="url(images/x.png)";
                    vBottomRight = 1;
                    checkwin();
                    roboplay();
                    break;

                }


            } else {
                //Cannot be used
            
            } 
        }