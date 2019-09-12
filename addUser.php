<?php

    //This file is used to to add the scores + names to the highscore database
    include('db.php');
    $newCon = openDB();

    if (isset($_POST['int']) && isset($_POST['score'])) {
        $score = mysqli_real_escape_string($newCon, $_POST['score']);
        $name = mysqli_real_escape_string($newCon, $_POST['int']);
        mysqli_query($newCon, "INSERT INTO highscores (id, initials, score) VALUES ('', '". $name ."', '". $score ."')");

        header("Location: index.php");
    } else {
        echo 'There was an error. Sorry please try again';
    }

    closeDB($newCon);
?>  