<?php
//This is the database file, below are a list of variables you can edit to accurately reflect
//your mysql information, host is usually localhost

    function openDB() {
        $dbhost = "localhost";
        $dbuser = "toor";
        $dbpass = "root";
        $db = "brickbreak";

        $con = new mysqli($dbhost, $dbuser, $dbpass, $db) or die ("Database connection failed");

        return $con;
    }

    function closeDB($con) {
        $con -> close();
    }
?>  