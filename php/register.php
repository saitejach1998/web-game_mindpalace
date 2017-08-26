<?php
$bar = isset($_POST["name"]) ? $_POST["name"] : null;
$fname = "../data/Ranking.csv";
if (file_exists($fname)) {
    $file = fopen($fname,"a+");
    fwrite($file,"0,".$bar.",0"."\n");
    fclose($file);

    echo "Done";
} else {
    echo "file not found";
}
?>
