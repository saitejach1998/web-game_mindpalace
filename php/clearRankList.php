<?php

    $name = "../data/Ranking.csv";
    $file = fopen($name,"w") or exit("error opening file");
    fclose($file);
    echo "cleared"
 ?>
