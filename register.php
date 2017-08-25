<?php
$bar = isset($_POST['name']) ? $_POST['name'] : null;
$fname = getcwd()."/TeamNames.txt";
if (file_exists($fname)) {
    //Your code here
    $file = fopen($fname,"a+");
    fwrite($file,$bar."\n");
    fclose($file);

    echo "Done";
} else {
    //error gracefully
    echo "file not found";
}
//echo "Done".$fname;
?>
